import Task from "../models/tasks.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, category, dueDate } = req.body;

    const userId = req.user.id;

    const task = new Task({
      title,
      description,
      category,
      dueDate,
      user: userId,
    });

    await task.save();
    return res.status(201).json(task);
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return res
      .status(500)
      .json({ error: error.message || "Erro ao tentar criar tarefa" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao buscar todas as tarefas",
    });
  }
};

export const getTodayTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setUTCDate(today.getUTCDate() + 1);

    const tasks = await Task.find({
      user: userId,
      dueDate: { $gte: today, $lt: tomorrow },
    }).sort({ dueDate: 1 });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar tarefas de hoje" });
  }
};

export const getUpcomingTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      user: userId,
      dueDate: { $gt: today },
    }).sort({ dueDate: 1 });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar tarefas futuras" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;
    const { title, description, category, dueDate, completed } = req.body;

    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (category !== undefined) task.category = category;
    if (dueDate !== undefined) task.dueDate = new Date(dueDate);
    if (completed !== undefined) task.completed = completed;

    await task.save();

    return res
      .status(200)
      .json({ message: "Tarefa atualizada com sucesso", task });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
};

export const toggleTaskCompletion = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    const task = await Task.findOne({ _id: taskId, user: userId });

    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    task.completed = !task.completed;
    await task.save();

    return res
      .status(200)
      .json({ message: "Tarefa atualizada com sucesso", task });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    return res
      .status(200)
      .json({ message: "Tarefa excluída com sucesso", task });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao tentar excluir tarefa" });
  }
};
