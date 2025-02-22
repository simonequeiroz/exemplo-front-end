const mongoose = require("mongoose");

// Define o modelo
const addressSchema = new mongoose.Schema(
  {
    cep: {
      type: String,
      required: true,
      unique: true, // Garante que o Cep seja único registro
    },
    logradouro: {
      type: String,
      required: true,
    },
    bairro: {
      type: String,
      required: true,
    },
    cidade: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true,
      maxlength: 2, // Estado deve ter no máximo 2 caracteres (Ex: SP)
    },
  },
  {
    timestamps: true, // Adiciona hora da criação e edição automaticamente
  }
);

// Cria o modelo
const Address = mongoose.model("Address", addressSchema);

// Exporta o modelo para ser usado
module.exports = Address;
