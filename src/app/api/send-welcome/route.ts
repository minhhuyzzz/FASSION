import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // ... (phần import giữ nguyên)

    const data = await resend.emails.send({
        from: 'SERANA <onboarding@resend.dev>', 
        to: [email],
        subject: 'Chào mừng quý khách đến với Thế giới SERANA',
        html: `
          <div style="font-family: 'Times New Roman', serif; max-width: 600px; margin: 0 auto; padding: 50px 30px; background-color: #FDFAF8; border: 1px solid #A4717A; color: #1F1F1F; line-height: 1.8;">
          
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-weight: normal; letter-spacing: 0.4em; color: #A4717A; text-transform: uppercase; margin: 0;">SERANA</h1>
            <p style="font-size: 10px; letter-spacing: 0.2em; opacity: 0.6; margin-top: 5px;">HAUTE COUTURE ATELIER</p>
          </div>

          <p>Kính thưa quý khách,</p>

          <p>Thay mặt cho toàn thể đội ngũ sáng tạo tại <strong style="color: #A4717A;">SERANA</strong>, chúng tôi xin gửi lời cảm ơn chân thành nhất vì sự hiện diện của quý khách trong cộng đồng tinh hoa của chúng tôi.</p>

          <p>Tại SERANA, mỗi sợi tơ, mỗi nhát kéo đều mang trong mình một ý niệm về sự độc bản. Chúng tôi không chỉ tạo ra trang phục; chúng tôi cùng quý khách viết nên những <span style="font-style: italic; color: #A4717A;">bản tuyên ngôn về phong cách</span> và di sản cá nhân trường tồn với thời gian.</p>

          <p>Gia nhập <strong>SERANA Inner Circle</strong>, quý khách sẽ là những người đầu tiên nhận được những đặc quyền:</p>
          
          <ul style="padding-left: 20px; border-left: 1px solid #A4717A; list-style-type: none;">
            <li style="margin-bottom: 10px;">• Chiêm ngưỡng các bộ sưu tập Haute Couture độc bản trước khi công bố.</li>
            <li style="margin-bottom: 10px;">• Ưu tiên lịch hẹn tư vấn riêng tư cùng các nghệ nhân hàng đầu.</li>
            <li style="margin-bottom: 10px;">• Lời mời tham dự các buổi trình diễn và sự kiện nghệ thuật giới hạn.</li>
          </ul>

          <p>Chúng tôi tin rằng cái đẹp đích thực cần thời gian và tâm hồn để thấu cảm. Hy vọng SERANA sẽ sớm được cùng quý khách kiến tạo nên những tuyệt tác rạng rỡ nhất.</p>

          <div style="margin-top: 50px; text-align: right;">
            <p style="margin-bottom: 0;">Trân trọng từ tâm,</p>
            <p style="font-style: italic; font-size: 20px; color: #A4717A; margin-top: 5px;">Đội ngũ SERANA</p>
          </div>

          <hr style="border: none; border-top: 1px solid #A4717A; opacity: 0.2; margin: 40px 0;" />

          <div style="text-align: center; font-size: 11px; opacity: 0.5; font-style: italic;">
            PARIS &bull; HA NOI &bull; SAIGON
          </div>
        </div>
        `,
      });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}