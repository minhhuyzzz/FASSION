import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Hệ thống sẽ tự tìm KEY trong file .env.local mà quý cô vừa tạo
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: "Bạn là SERENA AI , trợ lý tinh tế của hãng thời trang SERENA. Hãy dùng từ ngữ sang trọng như 'Quý cô', 'Thượng khách' và tư vấn sâu về lụa, đá quý và phong cách Atelier.",
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    return NextResponse.json({ text: response.text() });
  } catch (error) {
    console.error("Lỗi AI thực tế:", error);
    return NextResponse.json({ text: "Hệ thống đang bận tâm trong giây lát, Quý cô vui lòng thử lại sau." }, { status: 500 });
  }
}