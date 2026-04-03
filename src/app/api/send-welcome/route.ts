import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Email không hợp lệ." }, { status: 400 });
    }

    if (!resend) {
      return NextResponse.json(
        { error: "Chưa cấu hình RESEND_API_KEY trên server." },
        { status: 500 }
      );
    }

    const from =
      process.env.RESEND_FROM?.trim() || "SERENA <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from,
      to: [email],
      subject: "Chào mừng quý khách đến với Thế giới SERENA",
      html: `
          <div style="font-family: 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 50px 30px; background-color: #FDFAF8; border: 1px solid #A4717A; color: #1F1F1F; line-height: 1.8;">
          
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-weight: normal; letter-spacing: 0.4em; color: #A4717A; text-transform: uppercase; margin: 0;">SERENA</h1>
            <p style="font-size: 10px; letter-spacing: 0.2em; opacity: 0.6; margin-top: 5px;">HAUTE COUTURE ATELIER</p>
          </div>

          <p>Kính thưa quý khách,</p>

          <p>Thay mặt cho toàn thể đội ngũ sáng tạo tại <strong style="color: #A4717A;">SERENA</strong>, chúng tôi xin gửi lời cảm ơn chân thành nhất vì sự hiện diện của quý khách trong cộng đồng tinh hoa của chúng tôi.</p>

          <p>Tại SERENA, mỗi sợi tơ, mỗi nhát kéo đều mang trong mình một ý niệm về sự độc bản. Chúng tôi không chỉ tạo ra trang phục; chúng tôi cùng quý khách viết nên những <span style="font-style: italic; color: #A4717A;">bản tuyên ngôn về phong cách</span> và di sản cá nhân trường tồn với thời gian.</p>

          <p>Gia nhập <strong>SERENA Inner Circle</strong>, quý khách sẽ là những người đầu tiên nhận được những đặc quyền:</p>
          
          <ul style="padding-left: 20px; border-left: 1px solid #A4717A; list-style-type: none;">
            <li style="margin-bottom: 10px;">• Chiêm ngưỡng các bộ sưu tập Haute Couture độc bản trước khi công bố.</li>
            <li style="margin-bottom: 10px;">• Ưu tiên lịch hẹn tư vấn riêng tư cùng các nghệ nhân hàng đầu.</li>
            <li style="margin-bottom: 10px;">• Lời mời tham dự các buổi trình diễn và sự kiện nghệ thuật giới hạn.</li>
          </ul>

          <p>Chúng tôi tin rằng cái đẹp đích thực cần thời gian và tâm hồn để thấu cảm. Hy vọng SERENA sẽ sớm được cùng quý khách kiến tạo nên những tuyệt tác rạng rỡ nhất.</p>

          <div style="margin-top: 50px; text-align: right;">
            <p style="margin-bottom: 0;">Trân trọng từ tâm,</p>
            <p style="font-style: italic; font-size: 20px; color: #A4717A; margin-top: 5px;">Đội ngũ SERENA</p>
          </div>

          <hr style="border: none; border-top: 1px solid #A4717A; opacity: 0.2; margin: 40px 0;" />

          <div style="text-align: center; font-size: 11px; opacity: 0.5; font-style: italic;">
            PARIS &bull; HA NOI &bull; SAIGON
          </div>
        </div>
        `,
    });

    if (error) {
      console.error("[send-welcome]", error);
      return NextResponse.json(
        { error: error.message || "Resend từ chối gửi email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (e) {
    console.error("[send-welcome]", e);
    return NextResponse.json({ error: "Lỗi máy chủ." }, { status: 500 });
  }
}
