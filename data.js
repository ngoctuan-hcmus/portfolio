export const projects = [
    { id: 1, title: 'Mô phỏng tản nhiệt linh kiện điện tử',
        tags: ['Matlab', 'Mô phỏng', 'Data']},
    { id: 2, title: 'Thiết kế PCB bo mạch điều khiển trung tâm',
        tags: ['Snapmagic', 'Cad', 'Phần cứng']},
    { id: 3, title: 'Hệ thống tự động phân loại bằng PLC',
        tags: ['PLC', 'Tự động hoá']},
    { id: 4, title: 'Trạm quan trắc môi trường thời gian thực',
        tags: ['Web', 'C++', 'Arduino']},
    { id: 5, title: 'Thuật toán lọc nhiễu tín hiệu sinh học (ECG)',
        tags: ['Python', 'Xử lý tín hiệu']
    }
    ];
const ul = document.querySelector('#project-list');
const tpl = document.querySelector('#project-card');

function render(list) {
  ul.textContent = '';
  
  // Xử lý khi kết quả rỗng (Chưa có trong code của bạn)
  if (list.length === 0) {
    const emptyMsg = document.createElement('li');
    emptyMsg.textContent = 'Không có dự án phù hợp';
    ul.append(emptyMsg);
    return;
  }

  // Khúc này bạn đã làm đúng
  for (const p of list) {
    const li = tpl.content.cloneNode(true);
    li.querySelector('h3').textContent = p.title;
    li.querySelector('.tags').textContent = p.tags.join(', ');
    ul.append(li);
  }
}
render(projects);
const tags = [...new Set(
  projects.flatMap((p) => p.tags),
)];
const bar = document.querySelector(
  '#filters');

for (const tag of ['all', ...tags]) {
  const b = document.createElement('button');
  b.textContent = tag;
  b.dataset.tag = tag;
  // Bổ sung: Nút 'all' mặc định được chọn ban đầu
  b.setAttribute('aria-pressed', tag === 'all' ? 'true' : 'false');
  bar.append(b);
}

bar.addEventListener('click', (e) => {
  const tag = e.target.dataset.tag;
  if (!tag) return;

  // Bổ sung: Tắt aria-pressed của tất cả các nút, rồi bật cho nút vừa bấm
  bar.querySelectorAll('button').forEach(btn => btn.setAttribute('aria-pressed', 'false'));
  e.target.setAttribute('aria-pressed', 'true');

  const filtered = tag === 'all'
    ? projects
    : projects.filter((p) => p.tags.includes(tag));

  render(filtered);
});
const toggle = document.querySelector('#theme-toggle');
const root = document.documentElement;

// Hàm phụ trợ: Cập nhật icon của nút dựa vào trạng thái hiện tại
function updateToggleIcon() {
  const isDark = root.classList.contains('dark');
  // Nếu đang tối thì hiện Mặt trời, đang sáng thì hiện Mặt trăng
  toggle.textContent = isDark ? '☀️' : '🌙'; 
}

// Kiểm tra bộ nhớ khi load trang
if (localStorage.getItem('theme') === 'dark') {
  root.classList.add('dark');
}
updateToggleIcon(); // Chạy hàm để gán đúng icon lúc vừa vào web

// Xử lý sự kiện click
toggle.addEventListener('click', () => {
  root.classList.toggle('dark');
  const isDark = root.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
  updateToggleIcon(); // Đổi icon ngay khi click
});
if (localStorage.getItem('theme')
    === 'dark') {
  root.classList.add('dark');
}
// Xử lý Form liên hệ
const contactForm = document.querySelector('#contact form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    const emailInput = document.querySelector('#email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(emailInput)) {
      alert('Gửi thông tin thành công!');
      contactForm.reset(); 
    } else {
      alert('Email không hợp lệ. Vui lòng kiểm tra lại!');
    }
  });
}
const searchInput = document.querySelector('#search-input');
searchInput.addEventListener('input', (e) => {
  // Lấy từ khóa, xóa khoảng trắng thừa và chuyển về chữ thường
  const keyword = e.target.value.trim().toLowerCase(); 

  // Lọc mảng projects: kiểm tra xem title (in thường) có chứa từ khóa không
  const searchedProjects = projects.filter(p => 
    p.title.toLowerCase().includes(keyword)
  );

  // Tắt highlight của các nút tag vì đang dùng thanh tìm kiếm
  bar.querySelectorAll('button').forEach(btn => btn.setAttribute('aria-pressed', 'false'));
  
  // Render lại danh sách
  render(searchedProjects);
});