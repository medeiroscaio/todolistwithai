import jwt from "jsonwebtoken";

// Segredos temporários para estudo:
const ACCESS_SECRET = "segredoAleatorioAcesso123";
const REFRESH_SECRET = "segredoAleatorioRefresh456";

export const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Faça login novamente." });
  }

  try {
    const decoded = jwt.verify(accessToken, ACCESS_SECRET);
    req.user = { id: decoded.id };
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError" && refreshToken) {
      return jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Sessão expirada. Faça login novamente." });
        }

        const newAccessToken = jwt.sign({ id: decoded.id }, ACCESS_SECRET, {
          expiresIn: "15m",
        });

        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
          maxAge: 15 * 60 * 1000, // 15 minutos
        });

        req.user = { id: decoded.id };
        return next();
      });
    } else {
      return res
        .status(403)
        .json({ message: "Token inválido ou sessão expirada." });
    }
  }
};
