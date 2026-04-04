export type JournalPost = {
    id: number;
    category: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
    featured: boolean;
    readMin?: number;
  };
  
  export const journalData: JournalPost[] = [
    {
      id: 1,
      category: "Nghệ thuật",
      title: "THỜI TRANG NỮ – HÀNH TRÌNH KHẲNG ĐỊNH BẢN THÂN TRONG XÃ HỘI HIỆN ĐẠI",
      excerpt: "Khám phá hành trình từ những thước vải lụa thô sơ...",
      content: `
        <div style="text-align: justify;">
          <p>Trong đời sống hiện đại, thời trang nữ không còn đơn thuần là nhu cầu ăn mặc để che chắn hay làm đẹp, mà đã trở thành một phương tiện thể hiện bản thân đầy mạnh mẽ. Trang phục người phụ nữ lựa chọn mỗi ngày đều mang theo những thông điệp riêng về cá tính, tâm trạng và phong cách sống. Giữa xã hội ngày càng đề cao sự khác biệt và bản sắc cá nhân, thời trang chính là “ngôn ngữ không lời” giúp phái đẹp khẳng định vị trí của mình. Vì thế, bàn về thời trang nữ cũng chính là bàn về hành trình tìm kiếm và thể hiện giá trị cá nhân của người phụ nữ trong thời đại mới.</p>
          
          <h2 style="font-weight: bold; margin: 24px 0 12px 0;">1. Thời trang phản ánh cá tính và bản sắc riêng</h2>
          <img src="/images/blog1.jpg" alt="Fashion identity" style="width:100%; margin: 20px 0; border-radius: 2px;"/>
          <p>Trước hết, thời trang là sự phản chiếu rõ nét nhất cá tính của mỗi người phụ nữ. Mỗi phong cách, mỗi màu sắc, mỗi kiểu dáng đều phần nào thể hiện thế giới nội tâm của người mặc. Người yêu thích phong cách tối giản thường lựa chọn những gam màu trung tính và thiết kế thanh lịch, thể hiện sự chín chắn và tinh tế. Ngược lại, những cô gái chuộng sự phá cách, nổi bật thường ưu tiên các thiết kế độc đáo, màu sắc ấn tượng, cho thấy tinh thần sáng tạo và khát khao khác biệt. Chính sự đa dạng ấy làm nên bức tranh phong phú của thời trang nữ hiện đại. Tuy nhiên, giá trị thực sự của thời trang không nằm ở việc chạy theo xu hướng, mà ở khả năng lựa chọn phong cách phù hợp với bản thân. Khi người phụ nữ hiểu rõ mình là ai và muốn thể hiện điều gì, trang phục sẽ trở thành công cụ giúp họ tự tin hơn trong mọi hoàn cảnh.</p>
          
          <h2 style="font-weight: bold; margin: 24px 0 12px 0;">2. Thời trang gắn liền với sự phát triển của xã hội</h2>
          <p>Không thể phủ nhận rằng thời trang nữ luôn song hành cùng những biến chuyển của xã hội. Nếu trong quá khứ, trang phục phụ nữ bị bó buộc bởi những chuẩn mực nghiêm ngặt thì ngày nay, họ đã có nhiều tự do hơn trong cách ăn mặc và thể hiện bản thân.</p>
          <img src="/images/blog2.jpg" alt="Social development" style="width:100%; margin: 20px 0; border-radius: 2px;"/>
          <p>Sự phổ biến của những bộ suit nữ, quần âu hay phong cách năng động cho thấy hình ảnh người phụ nữ hiện đại ngày càng mạnh mẽ, độc lập và chủ động. Thời trang vì thế không chỉ phản ánh thẩm mỹ mà còn phản ánh vị thế xã hội của phụ nữ. Qua từng giai đoạn phát triển, những thay đổi trong thiết kế và phong cách đã phần nào minh chứng cho quá trình khẳng định vai trò và quyền bình đẳng của phái đẹp trong nhiều lĩnh vực của đời sống.</p>
          
          <h2 style="font-weight: bold; margin: 24px 0 12px 0;">3. Sự tinh tế và phù hợp – yếu tố làm nên giá trị bền vững</h2>
          <p>Bên cạnh yếu tố cá tính và xu hướng, sự tinh tế và phù hợp chính là thước đo quan trọng của thời trang. Một bộ trang phục dù hợp mốt đến đâu nhưng không phù hợp với hoàn cảnh hay không tôn lên vóc dáng người mặc thì cũng khó có thể tạo ấn tượng tốt. Thời trang đẹp không phải là sự phô trương mà là sự hài hòa giữa ngoại hình và thần thái. Sự chỉn chu khi lựa chọn trang phục đi học, đi làm hay tham dự sự kiện thể hiện ý thức tôn trọng bản thân và người xung quanh. Chính sự phù hợp ấy giúp phong cách của người phụ nữ trở nên bền vững và tạo dấu ấn lâu dài, thay vì chỉ nổi bật nhất thời theo trào lưu.</p>
        </div>
      `,
      image: "/images/b6.jpg",
      date: "25.03.2026",
      featured: true,
      readMin: 8,
    },
    {
      id: 2,
      category: "Xu hướng",
      title: "VẺ ĐẸP CỦA NGƯỜI PHỤ NỮ HIỆN ĐẠI – SỰ KẾT HỢP HÀI HÒA GIỮA TRÍ TUỆ, BẢN LĨNH VÀ TÂM HỒN",
      excerpt: "Tại sao sắc trắng luôn là lựa chọn vĩnh cửu...",
      content: `
        <div style="text-align: justify;">
          <p>Trong dòng chảy không ngừng của xã hội hiện đại, quan niệm về vẻ đẹp của người phụ nữ đã có nhiều thay đổi sâu sắc. Nếu trước đây, vẻ đẹp thường được đánh giá qua những tiêu chuẩn hình thức như dung mạo hay dáng vẻ dịu dàng, thì ngày nay, vẻ đẹp ấy được nhìn nhận toàn diện hơn. Người phụ nữ không chỉ đẹp ở ngoại hình mà còn ở trí tuệ, bản lĩnh và cách họ sống giữa cuộc đời nhiều thử thách. Chính sự thay đổi trong nhận thức xã hội đã mở ra một không gian rộng lớn để phụ nữ khẳng định giá trị của mình, không còn bị giới hạn bởi những khuôn mẫu cứng nhắc. Vì vậy, khi bàn về vẻ đẹp của người phụ nữ hiện đại, cần nhìn nhận đó là một vẻ đẹp đa chiều, hài hòa giữa truyền thống và đổi mới.</p>
          
          <p><b style="font-size: 1.1rem;">1. Tri thức – Nền tảng của vẻ đẹp bền vững</b></p>
          <p>Trước hết, tri thức chính là yếu tố quan trọng tạo nên sức hấp dẫn lâu dài của người phụ nữ trong xã hội ngày nay. Trong thời đại khoa học – công nghệ phát triển mạnh mẽ, kiến thức trở thành chìa khóa để mỗi cá nhân khẳng định vị thế và giá trị của mình. Người phụ nữ có học vấn, có tư duy độc lập và khả năng phân tích vấn đề sẽ luôn tạo được sự tôn trọng từ người khác. Tri thức không chỉ giúp họ thành công trong công việc mà còn giúp họ sống sâu sắc và hiểu biết hơn trong các mối quan hệ xã hội. Một người phụ nữ có hiểu biết sẽ biết cách lắng nghe, phản biện và thể hiện quan điểm một cách thuyết phục. Vẻ đẹp trí tuệ vì thế không phô trương nhưng lại có sức lan tỏa mạnh mẽ, khiến người khác nể phục và tin tưởng.</p>
          <p>Bên cạnh yếu tố cá tính và xu hướng, sự tinh tế và phù hợp chính là thước đo quan trọng của thời trang. Một bộ trang phục dù hợp mốt đến đâu nhưng không phù hợp với hoàn cảnh hay không tôn lên vóc dáng người mặc thì cũng khó có thể tạo ấn tượng tốt.</p>
          <img src="/images/blog3.jpg" alt="Knowledge and beauty" style="width:100%; margin: 20px 0; border-radius: 2px;"/>
          <p>Bên cạnh yếu tố cá tính và xu hướng, sự tinh tế và phù hợp chính là thước đo quan trọng của thời trang. Một bộ trang phục dù hợp mốt đến đâu nhưng không phù hợp với hoàn cảnh hay không tôn lên vóc dáng người mặc thì cũng khó có thể tạo ấn tượng tốt.</p>
          
          <p><b style="font-size: 1.1rem;">2. Bản lĩnh – Sức mạnh của sự kiên định và tự chủ</b></p>
          <p>Bên cạnh tri thức, bản lĩnh là yếu tố làm nên vẻ đẹp mạnh mẽ của người phụ nữ hiện đại. Cuộc sống luôn đặt ra những thử thách và áp lực, đòi hỏi con người phải có ý chí và nghị lực để vượt qua. Người phụ nữ bản lĩnh là người dám đối diện với khó khăn, dám theo đuổi ước mơ và kiên trì với mục tiêu đã chọn. Họ không ngại thay đổi để phát triển, cũng không dễ dàng bỏ cuộc trước thất bại.</p>
          <img src="/images/blog4.jpg" alt="Bravery and strength" style="width:100%; margin: 20px 0; border-radius: 2px;"/>
          <p>Trong gia đình, họ có thể là chỗ dựa tinh thần vững chắc; trong công việc, họ là những cá nhân có trách nhiệm và năng lực; trong xã hội, họ đóng góp tích cực bằng tài năng và tâm huyết của mình. Sự tự chủ trong suy nghĩ và hành động giúp họ không bị chi phối bởi định kiến hay áp lực từ dư luận. Chính bản lĩnh ấy làm nên vẻ đẹp của sự trưởng thành và chín chắn, giúp người phụ nữ đứng vững giữa những biến động của thời đại.</p>
          
          <p><b style="font-size: 1.1rem;">3. Tâm hồn – Giá trị cốt lõi không thể thay thế</b></p>
          <p>Dù tri thức và bản lĩnh quan trọng đến đâu, vẻ đẹp tâm hồn vẫn luôn là nền tảng cốt lõi của người phụ nữ. Lòng nhân ái, sự bao dung và tinh thần sẻ chia là những phẩm chất làm nên nét đẹp truyền thống được gìn giữ qua nhiều thế hệ. Trong xã hội hiện đại đầy cạnh tranh, một người phụ nữ biết yêu thương và quan tâm đến người khác càng trở nên đáng quý. Tâm hồn đẹp không chỉ thể hiện qua lời nói mà còn qua hành động cụ thể trong cuộc sống hằng ngày. Đó có thể là sự hy sinh thầm lặng cho gia đình, sự tận tâm trong công việc hay những nghĩa cử giúp đỡ cộng đồng. Chính sự kết hợp giữa mạnh mẽ bên ngoài và dịu dàng bên trong đã tạo nên hình ảnh người phụ nữ toàn diện. Vẻ đẹp ấy không ồn ào nhưng đủ sâu sắc để chạm đến trái tim người khác.</p>
        </div>
      `,
      image: "/images/b3.jpg",
      date: "20.03.2026",
      featured: false,
      readMin: 5,
    },
    {
      id: 3,
      category: "Phong cách",
      title: "XU HƯỚNG THỜI TRANG TẤM GƯƠNG PHẢN CHIẾU NHỊP SỐNG HIỆN ĐẠI",
      excerpt: "Cách lựa chọn trang sức để tôn vinh trang phục thiết kế...",
      content: `
        <div style="text-align: justify;">
          <p>Thời trang luôn vận động cùng nhịp thở của xã hội, và xu hướng thời trang chính là biểu hiện rõ nét nhất của sự vận động ấy. Mỗi giai đoạn phát triển của đời sống kinh tế, văn hóa hay công nghệ đều in dấu trong cách con người ăn mặc. Xu hướng không chỉ đơn thuần là những kiểu dáng “đang thịnh hành” mà còn phản ánh tâm lý, nhu cầu và quan niệm thẩm mỹ của cộng đồng. Chính vì vậy, bàn về xu hướng thời trang là bàn về mối quan hệ mật thiết giữa con người và thời đại mà họ đang sống.</p>
          
          <p><b style="font-size: 1.1rem;">1. Xu hướng thời trang – sự phản ánh của xã hội hiện đại</b></p>
          <p>Trước hết, xu hướng thời trang chịu tác động mạnh mẽ từ bối cảnh xã hội. Khi nhịp sống trở nên nhanh và năng động hơn, con người ưu tiên những thiết kế thoải mái, tiện dụng nhưng vẫn đảm bảo tính thẩm mỹ. Sự lên ngôi của phong cách tối giản, năng động hay trung tính cho thấy nhu cầu hướng đến sự tinh gọn và thực tế trong đời sống hiện đại. Bên cạnh đó, sự phát triển của mạng xã hội cũng khiến xu hướng lan truyền với tốc độ nhanh chóng. Chỉ trong thời gian ngắn, một kiểu trang phục có thể trở thành trào lưu được nhiều người hưởng ứng. Điều này cho thấy xu hướng thời trang không còn bị giới hạn trong phạm vi địa lý mà đã mang tính toàn cầu hóa rõ rệt.</p>
          <img src="/images/blog5.jpg" alt="Modern life mirror" style="width:100%; margin: 20px 0; border-radius: 2px;"/>
          <p>Tuy nhiên, chính sự lan truyền nhanh ấy cũng đặt ra vấn đề về tính bền vững. Khi xu hướng thay đổi liên tục, nhiều người dễ rơi vào tâm lý chạy theo trào lưu mà quên mất sự phù hợp với bản thân. Do đó, việc tiếp cận xu hướng cần đi kèm với sự chọn lọc và tỉnh táo.</p>
          
          <p><b style="font-size: 1.1rem;">2. Sự đa dạng và cá nhân hóa trong xu hướng thời trang</b></p>
          <p>Một đặc điểm nổi bật của xu hướng thời trang hiện nay là tính đa dạng và cá nhân hóa ngày càng cao. Nếu trước đây, xu hướng thường mang tính đồng loạt thì ngày nay, mỗi cá nhân có thể biến tấu theo phong cách riêng. Sự kết hợp giữa cổ điển và hiện đại, giữa trang phục truyền thống và thiết kế cách tân đã tạo nên nhiều phong cách độc đáo. Xu hướng không còn áp đặt một khuôn mẫu cứng nhắc mà mở ra không gian sáng tạo cho người mặc.</p>
          <img src="/images/blog6.jpg" alt="Personalization in fashion" style="width:100%; margin: 20px 0; border-radius: 2px;"/>
          <p>Chính điều này góp phần khẳng định vai trò của thời trang như một phương tiện thể hiện cá tính. Người trẻ có thể lựa chọn phong cách năng động, phá cách; người trưởng thành hướng đến sự thanh lịch, tinh tế; trong khi nhiều người lại tìm kiếm vẻ đẹp giản dị, gần gũi. Sự đa dạng ấy làm phong phú bức tranh thời trang và phản ánh sự tôn trọng đối với cái tôi cá nhân trong xã hội hiện đại.</p>
        </div>
      `,
      image: "/images/b4.jpg",
      date: "15.03.2026",
      featured: false,
      readMin: 6,
    },
    {
      id: 4,
      category: "Sự kiện",
      title: "SERENA TẠI TUẦN LỄ THỜI TRANG XUÂN HÈ 2026 – GÓC TƯ VẤN MẶC ĐẸP BÍ QUYẾT XÂY DỰNG PHONG CÁCH TỰ TIN VÀ TINH TẾ",
      excerpt: "Nhìn lại những khoảnh khắc rực rỡ nhất của bộ sưu tập 'Lửa & Lụa'...",
      content: `
        <div style="text-align: justify;">
          <p>Mặc đẹp không đồng nghĩa với việc sở hữu những bộ trang phục đắt tiền hay chạy theo mọi xu hướng mới nhất. Thực tế, mặc đẹp là nghệ thuật lựa chọn trang phục phù hợp với vóc dáng, hoàn cảnh và cá tính của bản thân. Nhiều người cho rằng thời trang là điều gì đó phức tạp, nhưng chỉ cần nắm vững những nguyên tắc cơ bản, ai cũng có thể xây dựng cho mình một phong cách chỉn chu và tự tin. Góc tư vấn mặc đẹp vì thế không chỉ đơn thuần đưa ra lời khuyên về quần áo, mà còn giúp mỗi người hiểu rõ bản thân để tỏa sáng theo cách riêng.</p>
          
          <p><b style="font-size: 1.1rem;">1. Hiểu rõ vóc dáng – nền tảng của việc mặc đẹp</b></p>
          <img src="/images/blog7.jpg" alt="Body understanding" style="width:100%; margin: 20px 0; border-radius: 2px;"/>
          <p>Muốn mặc đẹp, trước hết cần hiểu rõ ưu điểm và hạn chế của cơ thể mình. Mỗi người có một dáng người khác nhau, vì vậy không có một công thức chung cho tất cả. Khi nắm được đặc điểm vóc dáng, việc lựa chọn trang phục sẽ trở nên dễ dàng hơn. Những thiết kế vừa vặn, cân đối sẽ giúp tôn lên ưu điểm và tạo cảm giác hài hòa cho tổng thể. Ngược lại, quần áo quá rộng hoặc quá chật đều có thể làm mất đi vẻ thanh lịch cần thiết. Việc lựa chọn màu sắc phù hợp với làn da và chiều cao cũng góp phần tạo nên hiệu ứng thị giác tích cực. Mặc đẹp không phải là che giấu bản thân, mà là biết cách làm nổi bật những nét riêng vốn có.</p>
          
          <p><b style="font-size: 1.1rem;">2. Phù hợp hoàn cảnh – yếu tố thể hiện sự tinh tế</b></p>
          <p>Trang phục không chỉ thể hiện cá tính mà còn phản ánh sự tôn trọng đối với môi trường xung quanh. Một bộ đồ phù hợp với hoàn cảnh sẽ giúp người mặc ghi điểm về sự tinh tế và chuyên nghiệp. Khi đi học hay đi làm, sự gọn gàng, lịch sự nên được ưu tiên; khi tham dự sự kiện, trang phục cần có điểm nhấn nổi bật hơn nhưng vẫn giữ được sự trang nhã. Sự lựa chọn đúng đắn không chỉ giúp bạn tự tin mà còn tạo ấn tượng tích cực với người đối diện. Chính vì vậy, mặc đẹp không chỉ là vấn đề thẩm mỹ cá nhân mà còn liên quan đến văn hóa ứng xử trong xã hội.</p>
          <img src="/images/blog8.jpg" alt="Appropriate context" style="width:100%; margin: 20px 0; border-radius: 2px;"/>
          
          <p><b style="font-size: 1.1rem;">3. Xây dựng tủ đồ thông minh và linh hoạt</b></p>
          <p>Một tủ đồ lý tưởng không cần quá nhiều nhưng cần có những món cơ bản, dễ phối hợp. Những trang phục mang tính linh hoạt cao có thể kết hợp trong nhiều hoàn cảnh khác nhau sẽ giúp tiết kiệm chi phí và thời gian lựa chọn.</p>
          <img src="/images/blog9.jpg" alt="Smart wardrobe" style="width:100%; margin: 20px 0; border-radius: 2px;"/>
          <p>Việc đầu tư vào chất lượng thay vì số lượng giúp trang phục giữ được form dáng lâu dài và tạo cảm giác chỉn chu hơn khi mặc. Bên cạnh đó, phụ kiện như túi xách, giày dép hay trang sức cũng đóng vai trò quan trọng trong việc hoàn thiện phong cách. Chỉ một điểm nhấn nhỏ cũng có thể làm tổng thể trở nên nổi bật và hài hòa hơn. Mặc đẹp không phải là điều quá phức tạp mà là kết quả của sự thấu hiểu bản thân và lựa chọn thông minh. Khi biết cân bằng giữa vóc dáng, hoàn cảnh và cá tính, mỗi người đều có thể xây dựng phong cách riêng cho mình. Thời trang không chỉ giúp nâng cao diện mạo bên ngoài mà còn góp phần nuôi dưỡng sự tự tin và thái độ sống tích cực. Vì thế, hãy xem việc mặc đẹp như một hành trình hoàn thiện bản thân, nơi mỗi ngày bạn đều có cơ hội làm mới mình và khẳng định giá trị riêng trong cuộc sống.</p>
        </div>
      `,
      image: "/images/b5.jpg",
      date: "10.03.2026",
      featured: false,
      readMin: 7,
    },
  ];