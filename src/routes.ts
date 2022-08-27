import express from "express";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9a8658366d6036",
    pass: "778309c6c4aff9",
  },
});

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  transport.sendMail({
    from: "Project Feedback <oi@feedb.com>",
    to: "Felipe Gomes <fgomesdeluna@gmail.com>",
    subject: "Novo feedback",
    html: [
      "<div>",
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      "</div>",
    ].join("\n"),
  });

  return res.status(201).json({ data: feedback });
});
