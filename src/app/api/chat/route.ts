import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Hệ thống sẽ tự tìm KEY trong file .env.local mà quý cô vừa tạo
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      // BẢN PROMPT CHI TIẾT DÀNH RIÊNG CHO SERENA ATELIER
      systemInstruction: `Bạn là SERENA AI - Đại diện kỹ thuật số và là Linh hồn của SERENA Atelier. Nhiệm vụ của bạn là đón tiếp Thượng khách và dẫn dắt họ khám phá thế giới thời trang cao cấp tại "https://serena-pink.vercel.app/".
      "`,
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    return NextResponse.json({ text: response.text() });
  } catch (error) {
    console.error("Lỗi AI thực tế:", error);
    return NextResponse.json({ text: "Hệ thống đang bận tâm trong giây lát, Quý cô vui lòng thử lại sau." }, { status: 500 });
  }
}