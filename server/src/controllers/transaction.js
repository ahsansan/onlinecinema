const { tbUser, tbTransaction, tbFilm, tbCategory } = require("../../models");
const { Op } = require("sequelize");
const fs = require("fs");

exports.addTransaction = async (req, res) => {
  try {
    const idUser = req.user.id;
    const data = req.body;
    const transactions = await tbTransaction.create({
      ...data,
      idUser: idUser,
      transferProof: req.file.filename,
    });
    const { id } = transactions;
    const findTransaction = await tbTransaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser", "idFilm"],
      },
    });

    res.status(200).send({
      status: "success",
      data: findTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const dataTransactions = await tbTransaction.findAll({
      include: [
        {
          model: tbUser,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "phone",
              "password",
              "image",
              "role",
            ],
          },
        },
        {
          model: tbFilm,
          as: "film",
          attributes: {
            exclude: ["createdAt", "updatedAt", "idCategory", "filmUrl"],
          },
          include: [
            {
              model: tbCategory,
              as: "category",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        },
      ],
      attributes: {
        exclude: ["updatedAt", "idFilm"],
      },
    });

    res.status(200).send({
      status: "success",
      data: dataTransactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.myList = async (req, res) => {
  try {
    const idUser = req.user.id;
    const dataTransactions = await tbTransaction.findAll({
      where: {
        [Op.and]: [{ idUser: idUser }, { status: "Approve" }],
      },
      include: [
        {
          model: tbFilm,
          as: "film",
          attributes: {
            exclude: ["createdAt", "updatedAt", "idCategory", "filmUrl"],
          },
          include: [
            {
              model: tbCategory,
              as: "category",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "success",
      data: dataTransactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const id = req.params.id;

    const dataTransaction = {
      ...req.body,
    };

    await tbTransaction.update(dataTransaction, {
      where: {
        id: id,
      },
    });

    const updateTransaction = await tbTransaction.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["updatedAt"],
      },
    });

    res.status(200).send({
      status: "Success",
      data: updateTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server erreeor",
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;

    const findTransaction = await tbTransaction.findOne({
      where: {
        id: id,
      },
    });

    if (!findTransaction) {
      return res.status(403).send({
        status: "failed",
        message: "Data not found",
      });
    }

    fs.unlink(`uploads/${findTransaction.transferProof}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    await tbTransaction.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).send({
      status: `${findTransaction.id} deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
