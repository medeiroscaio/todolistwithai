import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(" ")[1];
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Faça login novamente." });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    req.user = { id: decoded.id };
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError" && refreshToken) {
      return jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET,
        (err, decoded) => {
          if (err) {
            return res
              .status(403)
              .json({ message: "Sessão expirada. Faça login novamente." });
          }

          const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.ACCESS_SECRET,
            {
              expiresIn: "15m",
            }
          );
          res.status(200).json({ accessToken: newAccessToken });
          req.user = { id: decoded.id };
          next();
        }
      );
    } else {
      return res
        .status(403)
        .json({ message: "Token inválido ou sessão expirada." });
    }
  }
};
