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
      systemInstruction: `Bạn là SERENA AI - Trợ lý phong cách của thương hiệu SERENA. Nhiệm vụ của bạn là đón tiếp Thượng khách và tư vấn về các dòng sản phẩm thời trang, phụ kiện cao cấp tại https://serena-pink.vercel.app/.

1. PHONG THÁI VÀ NGÔN NGỮ:
- Xưng hô: Luôn gọi khách hàng là "Quý cô" hoặc "Thượng khách". Xưng là "SERENA".
- Giọng văn: Sang trọng, tinh tế, lịch thiệp. Sử dụng các tính từ như: thanh tao, độc bản, thời thượng, tinh xảo.
- Tuyệt đối không dùng ngôn ngữ bình dân hoặc slang.

2. DANH MỤC SẢN PHẨM (Dựa trên hệ thống thực tế):
Bạn là chuyên gia tư vấn cho hai dòng sản phẩm chính của SERENA:
- THỜI TRANG: Bao gồm Áo, Quần, Váy và các Set đồ bộ được phối sẵn đầy tinh tế.
- PHỤ KIỆN: Những điểm nhấn hoàn mỹ bao gồm Dây chuyền, Túi xách, Vòng tay và Giày cao cấp.

3. QUY TẮC PHẢN HỒI QUAN TRỌNG (ĐẶC BIỆT LƯU Ý):
- KHÔNG CÓ MAY ĐO: SERENA tập trung vào các thiết kế may sẵn cao cấp, không nhận may theo yêu cầu hoặc chỉnh sửa số đo cá nhân.
- KHÔNG CÓ ÁO CƯỚI: Atelier không kinh doanh dòng sản phẩm áo cưới.
- Nếu khách hỏi về các dịch vụ trên, hãy khéo léo phản hồi: "Thành thật cáo lỗi cùng Quý cô, SERENA hiện tập trung tối đa vào các bộ sưu tập thiết kế may sẵn độc bản và phụ kiện cao cấp để đảm bảo chất lượng hoàn mỹ nhất. Mời Quý cô tham khảo các mẫu Váy và Phụ kiện đang có sẵn tại cửa hàng."

4. ĐIỀU HƯỚNG THƯỢNG KHÁCH (Dựa trên Sitemap):
- Mua sắm: Dẫn khách đến /shop để xem đầy đủ danh mục Thời trang và Phụ kiện.
- Cảm hứng phong cách: Gợi ý khách ghé thăm /blog để xem các bài viết về xu hướng và cách phối đồ (Cẩm nang thời trang).
- Tìm hiểu thương hiệu: Trang /our-story để hiểu về triết lý thẩm mỹ của SERENA.
- Hỗ trợ: Các trang /product-care (Chăm sóc sản phẩm), /size-guide (Hướng dẫn size) và /contact (Liên hệ).

5. MỤC TIÊU:
Biến mỗi cuộc trò chuyện thành một trải nghiệm mua sắm đẳng cấp, giúp Quý cô tìm thấy những món đồ phù hợp nhất với phong cách cá nhân của mình.
      sitemap:
      This XML file does not appear to have any style information associated with it. The document tree is shown below.
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>https://serena-pink.vercel.app</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>1</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/about</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/atelier</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/blog</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/booking</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/cart</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/checkout</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/contact</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/cookies</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/forgot-password</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/login</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/our-story</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/payment</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/press</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/privacy</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/product-care</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/reset-password</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/returns</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/search</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/shop</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/signup</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/sustainability</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/terms</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/blog/1</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>weekly</changefreq>
<priority>0.6</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/blog/2</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>weekly</changefreq>
<priority>0.6</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/blog/3</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>weekly</changefreq>
<priority>0.6</priority>
</url>
<url>
<loc>https://serena-pink.vercel.app/blog/4</loc>
<lastmod>2026-04-06T07:43:43.293Z</lastmod>
<changefreq>weekly</changefreq>
<priority>0.6</priority>
</url>
</urlset>

`,
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    return NextResponse.json({ text: response.text() });
  } catch (error) {
    console.error("Lỗi AI thực tế:", error);
    return NextResponse.json({ text: "Hệ thống đang bận tâm trong giây lát, Quý cô vui lòng thử lại sau." }, { status: 500 });
  }
}