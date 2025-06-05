import User from "../models/users.js";

export const updateProfileImage = async (req, res) => {
  const { profileImage, email } = req.body;

  try {
    if (!profileImage) {
      return res.status(400).json({ error: "Imagem não fornecida" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    user.profileImage = profileImage;
    await user.save();

    return res
      .status(200)
      .json({ message: "Imagem de perfil atualizada com sucesso" });
  } catch (error) {
    console.error("Erro no profileController:", error);
    return res
      .status(500)
      .json({ error: "Erro ao atualizar a imagem de perfil" });
  }
};
