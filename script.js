// --- KHO CHỨA ẢNH THEO NĂM (BẠN SẼ SỬA Ở ĐÂY) ---
const photoData = {
    "2022": ["2022-1.jpg", "2022-2.jpg", "2022-3.jpg", "2022-4.jpg"],
    "2023": ["2023-1.jpg", "2023-2.jpg", "2023-3.jpg"],
    "2024": ["2024-1.jpg", "2024-2.jpg"],
    "2025": ["2025-1.jpg", "2025-2.jpg"],
    "2026": ["2026-1.jpg", "2026-2.jpg"]
    // Lưu ý: Tên trong ngoặc kép phải giống y hệt tên file ảnh bạn đã up lên GitHub
};

// --- CÁC BIẾN ĐIỀU KHIỂN ---
const touchLayer = document.getElementById('touch-effects-layer');
const screen1 = document.getElementById('screen-1');
const screen2 = document.getElementById('screen-2');
const screen3 = document.getElementById('screen-3');
const screen4 = document.getElementById('screen-4');
const bgMusic = document.getElementById('bg-music');

// --- HIỆU ỨNG CHẠM RA PHÁO HOA (Áp dụng toàn trang) ---
document.addEventListener('click', function(e) {
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    for(let i = 0; i < 5; i++) {
        let sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        // Bắn ngẫu nhiên ra xung quanh
        let angle = Math.random() * Math.PI * 2;
        let radius = Math.random() * 50;
        sparkle.style.transform = `translate(${Math.cos(angle)*radius}px, ${Math.sin(angle)*radius}px) scale(0)`;
        
        touchLayer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    }
}

// --- MÀN 1: MỞ HỘP QUÀ ---
document.getElementById('open-gift-btn').addEventListener('click', () => {
    // Bật nhạc khi mở quà (Trình duyệt yêu cầu phải có tương tác mới được phát nhạc)
    bgMusic.play(); 
    
    screen1.classList.remove('active');
    screen1.classList.add('hidden');
    screen2.classList.remove('hidden');
    screen2.classList.add('active');
});

// --- MÀN 2: TIMELINE BẮN ẢNH ---
const photoArea = document.getElementById('photo-display-area');

document.querySelectorAll('.year-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Xóa ảnh cũ trước khi bắn ảnh mới để không nặng máy
        photoArea.innerHTML = ''; 
        
        let year = this.getAttribute('data-year');
        let images = photoData[year];
        
        if(images && images.length > 0) {
            let rect = this.getBoundingClientRect();
            let centerX = rect.left + rect.width / 2;
            let centerY = rect.top + rect.height / 2;

            images.forEach((imgSrc, index) => {
                let polaroid = document.createElement('div');
                polaroid.className = 'polaroid';
                
                // Thay vì dùng icon, bây giờ chúng ta chèn thẻ <img>
                polaroid.innerHTML = `<img src="${imgSrc}" style="width:100%; height:80%; object-fit:cover; border-radius:3px;">`;
                
                // Set vị trí xuất phát từ nút bấm
                polaroid.style.left = (centerX - 65) + 'px';
                polaroid.style.top = (centerY - 75) + 'px';
                
                // Random góc xoay và vị trí bung ra
                let randomX = (Math.random() - 0.5) * 200; // Bay trái/phải max 100px
                let randomY = (Math.random() - 0.5) * 200; // Bay lên/xuống max 100px
                let randomRotate = (Math.random() - 0.5) * 40; // Xoay nghiêng
                
                polaroid.style.setProperty('--final-rotate', `rotate(${randomRotate}deg)`);
                polaroid.style.transform = `translate(${randomX}px, ${randomY}px)`;
                
                photoArea.appendChild(polaroid);
            });
        }
    });
});

document.getElementById('go-next-btn').addEventListener('click', () => {
    screen2.classList.remove('active');
    screen2.classList.add('hidden');
    screen3.classList.remove('hidden');
    screen3.classList.add('active');
});

// --- MÀN 3: CỔNG MẬT MÃ ---
// [NOTE DÀNH CHO BẠN]: Sửa mật mã đúng ở dòng bên dưới (chữ in thường)
const correctPassword = "anh yeu em"; 

document.getElementById('submit-password').addEventListener('click', () => {
    let input = document.getElementById('password-input').value.toLowerCase().trim();
    let errorMsg = document.getElementById('password-error');
    
    if (input === correctPassword) {
        screen3.classList.remove('active');
        screen3.classList.add('hidden');
        screen4.classList.remove('hidden');
        screen4.classList.add('active');
        startTypingMessage();
    } else {
        errorMsg.classList.remove('hidden');
        // Hiệu ứng rung lắc nhẹ khi sai
        document.querySelector('.password-box').style.animation = "bounce 0.3s";
        setTimeout(() => { document.querySelector('.password-box').style.animation = ""; }, 300);
    }
});

// --- MÀN 4: BÁNH KEM, NẾN & LỜI CHÚC ---
const messageText = "Chúc mừng sinh nhật cậu nhé! Tuổi mới luôn xinh đẹp, vui vẻ và... [Bạn sẽ viết lời chúc dài dằng dặc của bạn vào đây]";
let typeIndex = 0;

function startTypingMessage() {
    if (typeIndex < messageText.length) {
        document.getElementById('typing-message').innerHTML += messageText.charAt(typeIndex);
        typeIndex++;
        setTimeout(startTypingMessage, 50); // Tốc độ gõ chữ (50ms/chữ)
    }
}

// CƠ CHẾ THỔI/CHẠM NẾN & EASTER EGG
let candles = document.querySelectorAll('.candle');
let candlesLitCount = 3; // Ban đầu có 3 ngọn nến đang cháy
let relightOrder = [];
const secretOrder = ["left", "right", "center"]; // Thứ tự thắp lại bí mật

candles.forEach(candle => {
    candle.addEventListener('click', function() {
        let id = this.getAttribute('data-id');
        
        // Giai đoạn 1: Tắt nến
        if (!this.classList.contains('off')) {
            this.classList.add('off');
            this.innerHTML = "🕯️ (tắt)"; // Tạm đổi text để thấy rõ
            candlesLitCount--;
            
            // Khi tắt hết nến, đổi nền sang tối lấp lánh (nếu thích)
            if(candlesLitCount === 0) {
                // Đã tắt hết nến, kích hoạt giai đoạn 2: Cho phép thắp lại
            }
        } 
        // Giai đoạn 2: Thắp lại (Kích hoạt Easter Egg)
        else if (candlesLitCount === 0 && !this.classList.contains('lit-again')) {
            this.classList.add('lit-again');
            this.innerHTML = "✨"; // Nến sáng rực lên
            relightOrder.push(id);
            
            // Kiểm tra thứ tự
            if (relightOrder.length === 3) {
                if (JSON.stringify(relightOrder) === JSON.stringify(secretOrder)) {
                    // Đúng thứ tự -> Bùm! Mở Easter Egg
                    setTimeout(() => {
                        document.getElementById('easter-egg-modal').classList.remove('hidden');
                    }, 500);
                } else {
                    // Sai thứ tự -> Reset lại cho thử lại
                    setTimeout(() => {
                        candles.forEach(c => {
                            c.classList.remove('lit-again');
                            c.innerHTML = "🕯️ (tắt)";
                        });
                        relightOrder = [];
                    }, 500);
                }
            }
        }
    });
});

// Đóng cửa sổ ẩn
document.getElementById('close-modal-btn').addEventListener('click', () => {
    document.getElementById('easter-egg-modal').classList.add('hidden');
});
