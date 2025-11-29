/* ====================
   Portal Hub JavaScript
   檔案結構：
   1. DOM 元素選取
   2. 選單互動功能
   3. 搜尋功能
   4. 登入功能
   5. 服務項目互動
   6. 工具函數
==================== */

// ==================== 1. DOM 元素選取 ====================
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const serviceItems = document.querySelectorAll('.service-item, .list-item, .college-card');

    // ==================== 3. 搜尋功能 ====================
    function performSearch() {
        const keyword = searchInput.value.toLowerCase().trim();
        
        if (keyword === '') {
            // 如果搜尋框為空，顯示所有項目
            serviceItems.forEach(item => {
                item.style.display = '';
                item.style.opacity = '1';
            });
            return;
        }

        serviceItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(keyword)) {
                item.style.display = '';
                item.style.opacity = '1';
            } else {
                item.style.opacity = '0.3'; // 淡化不符合的項目
                // 或者完全隱藏: item.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // ==================== 5. 服務項目互動 ====================
    // 簡單的點擊效果
    serviceItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 這裡可以添加點擊後的追蹤或特效
            console.log('Clicked:', this.textContent.trim());
        });
    });
});
