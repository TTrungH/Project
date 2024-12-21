import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Read = ({route, navigation}) => {
  const {name,content,order} = route.params;
  const content1 = `Vũ Quốc, Lăng Gia ở Thương Vân Trấn, trăng treo giữa trời.

Lăng Hàn bỏ ra ròng rã mười giây, mới rốt cục khẳng định, hắn xác thực chuyển thế sống lại.

Đối với một cường giả Thiên Nhân Cảnh mà nói, cần mất mười giây mới có thể khẳng định một chuyện, đây tuyệt đối khó mà tin nổi, nhưng cũng đồng dạng chứng minh, sự tình phát sinh ở trên người hắn, là khó mà tin nổi cỡ nào.

Đời trước, hắn đứng trên đỉnh cao của võ đạo, ở đan đạo cũng có thành tựu cổ kim chưa thấy, khai sáng Tam Hỏa Dẫn thuật, gợi ra một hồi cách mạng ở Luyện Đan giới, được người tôn là Đan Đế.

Nhưng hắn vẫn chưa thỏa mãn, còn muốn tiến thêm một bước, đạt đến Phá Hư Cảnh, Phá Toái Hư Không, hóa Phàm thành Thần trong truyền thuyết. Vì thế, hắn thăm dò vô số di tích, cuối cùng tiến vào Hắc Huyết Cốc, trải qua tầng tầng nguy hiểm, sau đó tìm tới một Cổ Tháp thần bí.

Không có để hắn thất vọng, trên Cổ Tháp có văn tự màu vàng, chính là một bộ công pháp vô thượng, tên là Bất Diệt Thiên Kinh, luyện đến cảnh giới tối cao, thân thể bất hư bất hủ, cùng thiên địa đồng thọ!

Nhưng cho dù lấy tu vi Thiên Nhân Cảnh của Lăng Hàn, vẫn cảm thấy Bất Diệt Thiên Kinh kia khó hiểu mịt mờ, thật giống như xem một quyển thiên thư, hoàn toàn không có manh mối.

Hắn mạnh mẽ ghi nhớ bản công pháp kia, đang muốn nghiên cứu Cổ Tháp một chút, thì Cổ Tháp lại chấn động, bắn ra một đạo thần quang vô lượng, trong nháy mắt liền đánh nát cơ thể của hắn. Nhưng quái lạ chính là, linh hồn của hắn lại không tiêu tan, rơi vào một loại trạng thái tỉnh tỉnh mê mê, kéo dài hơn vạn năm.

Ở chỗ này vạn năm, linh hồn của hắn vẫn suy diễn Bất Diệt Thiên Kinh, ngoại trừ chuyện đó, thì hắn không làm được chuyện gì, mười ngàn năm sau, hắn rốt cục lĩnh ngộ tầng thứ nhất của công pháp.

Một cường giả Thiên Nhân Cảnh, bỏ ra 10000 năm, mới lĩnh ngộ được tầng thứ nhất của một môn công pháp, khái niệm này nghĩa là gì?

Phải biết cường giả Thiên Nhân Cảnh, tuổi thọ cũng không tới ngàn năm, bình thường mà nói, thế gian căn bản không ai có thể tu thành Bất Diệt Thiên Kinh, bởi vì còn chưa có bắt đầu đã chết già.

Nhưng Lăng Hàn lại lấy loại phương thức quái lạ này, nắm giữ tầng thứ nhất của Bất Diệt Thiên Kinh, sau đó, hắn lại đột nhiên trùng sinh, chuyển thế sống lại ở trên người một thiếu niên mười sáu tuổi, đồng dạng tên là Lăng Hàn.

Khó mà tin nổi!

- Mặc kệ xảy ra chuyện gì, nói chung ta đã sống lại!

- Tuy bộ thân thể này mới chỉ là Luyện Thể tầng hai, phế vật đến không thể lại phế vật, nhưng ta đã từng là cường giả Thiên Nhân Cảnh, đứng ở đỉnh phong của võ đạo, lại là đan đạo đại sư, tư chất kém thì dùng đan dược tu bổ, không tin không thể trở lại đỉnh cao.

- Hơn nữa, ta rốt cục có thể tu luyện Bất Diệt Thiên Kinh, đây là một công pháp vô thượng, thậm chí... Khả năng không phải ở Phàm Giới, mà đến từ Thần giới trong truyền thuyết, bằng không làm sao có khả năng cần mười ngàn năm mới có thể hiểu được tầng thứ nhất?

- Đời này, ta nhất định có thể vượt qua tiền nhân, thành tựu Thần vị!

- Còn có, thân thể này đến tột cùng là xảy ra chuyện gì, mười sáu tuổi mới tu luyện tới Luyện Thể tầng hai, lẽ nào là bởi vì võ đạo bây giờ quá mức héo tàn?`;
  const content2 = '2';

  const [data, setData] = useState(content1);
  const [isAtTop, setIsAtTop] = useState(false); // Trạng thái ở đầu
  const [isAtBottom, setIsAtBottom] = useState(false); // Trạng thái ở cuối// Trạng thái khi cuộn tới cuối

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    // Kiểm tra nếu cuộn tới đầu
    if (contentOffset.y <= 0 && !isAtTop) {
      setIsAtTop(true);
      setIsAtBottom(false); 
      
    } 
    // Kiểm tra nếu cuộn tới cuối
    else if (
      contentOffset.y + layoutMeasurement.height >= contentSize.height - 20 && 
      !isAtBottom
    ) {
      setIsAtBottom(true);
      setIsAtTop(false);
      setData();
    } 
    // Nếu không ở đầu hoặc cuối
    else if (isAtTop || isAtBottom) {
      setIsAtTop(false);
      setIsAtBottom(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      stickyHeaderIndices={[0]}
      onScroll={handleScroll}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={20} style={styles.goback} />
      </TouchableOpacity>
      <Text style={styles.title}>
        Chương {order}: {name}
      </Text>
      <Text style={styles.content}>{content}</Text>
    </ScrollView>
  );
};
export default Read;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////-------------------STYLE-sHEET--------------------//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 3,
    fontSize: 5,
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 8,
    fontSize: 15,
    fontFamily: 'times new roman',
  },
  goback: {
    width: 20,
  },
  title: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 18,
    fontFamily: 'times new roman',
  },
});
