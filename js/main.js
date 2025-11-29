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
    
    // 選取 DOM 元素
    const menuCategories = document.querySelectorAll('.menu-category');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const loginBtn = document.getElementById('loginBtn');
    const serviceItems = document.querySelectorAll('.service-item');
    
    // ==================== 2. 選單互動功能 ====================
    // 點擊分類標題時展開/收合選單（手機版）
    menuCategories.forEach(function(category) {
        const header = category.querySelector('.category-header');
        
        header.addEventListener('click', function() {
            // 在手機版時，點擊可以展開/收合
            if (window.innerWidth <= 768) {
                // 關閉其他已展開的分類
                menuCategories.forEach(function(otherCategory) {
                    if (otherCategory !== category) {
                        otherCategory.classList.remove('expanded');
                    }
                });
                
                // 切換當前分類的展開狀態
                category.classList.toggle('expanded');
            }
        });
        
        // 滑鼠懸停效果（桌面版）
        category.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'scale(1.02)';
            }
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // ==================== 3. 搜尋功能 ====================
    // 搜尋按鈕點擊事件
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
    }
    
    // 搜尋輸入框按下 Enter 鍵
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
        
        // 搜尋輸入框獲得焦點時的效果
        searchInput.addEventListener('focus', function() {
            this.placeholder = '請輸入關鍵字搜尋服務...';
        });
        
        searchInput.addEventListener('blur', function() {
            this.placeholder = '請先登入';
        });
    }
    
    // 執行搜尋
    function performSearch() {
        const keyword = searchInput.value.trim();
        
        if (keyword === '') {
            showMessage('請輸入搜尋關鍵字', 'warning');
            return;
        }
        
        // 搜尋服務項目
        const results = searchServices(keyword);
        
        if (results.length > 0) {
            showMessage(`找到 ${results.length} 個相關服務`, 'success');
            highlightResults(results);
        } else {
            showMessage('找不到相關服務', 'info');
        }
        
        console.log('搜尋關鍵字：', keyword);
        console.log('搜尋結果：', results);
    }
    
    // 搜尋服務項目
    function searchServices(keyword) {
        const results = [];
        keyword = keyword.toLowerCase();
        
        serviceItems.forEach(function(item) {
            const serviceName = item.querySelector('.service-name').textContent.toLowerCase();
            if (serviceName.includes(keyword)) {
                results.push(item);
            }
        });
        
        return results;
    }
    
    // 高亮搜尋結果
    function highlightResults(results) {
        // 先移除所有高亮
        serviceItems.forEach(function(item) {
            item.classList.remove('highlighted');
            item.style.backgroundColor = '';
        });
        
        // 高亮符合的項目
        results.forEach(function(item) {
            item.classList.add('highlighted');
            item.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
            item.style.borderRadius = '8px';
        });
        
        // 滾動到第一個結果
        if (results.length > 0) {
            results[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // 3秒後移除高亮
        setTimeout(function() {
            results.forEach(function(item) {
                item.style.backgroundColor = '';
            });
        }, 3000);
    }
    
    // ==================== 4. 登入功能 ====================
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showLoginModal();
        });
    }
    
    // 顯示登入視窗
    function showLoginModal() {
        // 檢查是否已存在登入視窗
        if (document.querySelector('.login-modal')) {
            return;
        }
        
        // 建立登入視窗
        const modal = document.createElement('div');
        modal.className = 'login-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <h3>登入系統</h3>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="username">帳號</label>
                        <input type="text" id="username" placeholder="請輸入校園帳號" required>
                    </div>
                    <div class="form-group">
                        <label for="password">密碼</label>
                        <input type="password" id="password" placeholder="請輸入密碼" required>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn-submit">登入</button>
                        <button type="button" class="btn-cancel" id="cancelLogin">取消</button>
                    </div>
                </form>
                <p class="login-hint">提示：這是教學示範，請勿輸入真實密碼</p>
            </div>
        `;
        
        // 加入樣式
        const style = document.createElement('style');
        style.textContent = `
            .login-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
            }
            .modal-content {
                position: relative;
                background: white;
                padding: 30px;
                border-radius: 8px;
                width: 90%;
                max-width: 400px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }
            .modal-content h3 {
                margin-bottom: 20px;
                color: #1B5E20;
                text-align: center;
            }
            .modal-content .form-group {
                margin-bottom: 15px;
            }
            .modal-content label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
            }
            .modal-content input {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 14px;
            }
            .modal-content input:focus {
                outline: none;
                border-color: #1B5E20;
            }
            .form-actions {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }
            .btn-submit, .btn-cancel {
                flex: 1;
                padding: 10px;
                border: none;
                border-radius: 4px;
                font-size: 14px;
                cursor: pointer;
            }
            .btn-submit {
                background-color: #1B5E20;
                color: white;
            }
            .btn-submit:hover {
                background-color: #2E7D32;
            }
            .btn-cancel {
                background-color: #ccc;
                color: #333;
            }
            .btn-cancel:hover {
                background-color: #bbb;
            }
            .login-hint {
                margin-top: 15px;
                font-size: 12px;
                color: #999;
                text-align: center;
            }
        `;
        document.head.appendChild(style);
        
        // 加入頁面
        document.body.appendChild(modal);
        
        // 綁定事件
        const cancelBtn = document.getElementById('cancelLogin');
        const overlay = modal.querySelector('.modal-overlay');
        const loginForm = document.getElementById('loginForm');
        
        // 取消按鈕
        cancelBtn.addEventListener('click', function() {
            modal.remove();
        });
        
        // 點擊遮罩關閉
        overlay.addEventListener('click', function() {
            modal.remove();
        });
        
        // 表單提交
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            showMessage(`歡迎 ${username}！（示範模式）`, 'success');
            modal.remove();
            
            // 更新登入按鈕
            loginBtn.textContent = username;
            loginBtn.style.backgroundColor = '#2ecc71';
        });
    }
    
    // ==================== 5. 服務項目互動 ====================
    serviceItems.forEach(function(item) {
        // 點擊服務項目
        item.addEventListener('click', function(event) {
            event.preventDefault();
            
            const serviceName = this.querySelector('.service-name').textContent;
            showMessage(`您點擊了：${serviceName}`, 'info');
            
            // 點擊動畫效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log('點擊服務：', serviceName);
        });
        
        // 滑鼠懸停效果增強
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'rotate(0deg)';
        });
    });
    
    // ==================== 6. 工具函數 ====================
    // 顯示訊息提示
    function showMessage(text, type) {
        // 移除現有訊息
        const existingMessage = document.querySelector('.toast-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // 建立訊息元素
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = text;
        
        // 根據類型設定顏色
        const colors = {
            success: '#2ecc71',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };
        
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            background-color: ${colors[type] || colors.info};
            color: white;
            border-radius: 4px;
            font-size: 14px;
            z-index: 10000;
            animation: slideDown 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        `;
        
        // 加入動畫
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from {
                    transform: translateX(-50%) translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(toast);
        
        // 3秒後移除
        setTimeout(function() {
            toast.style.animation = 'slideDown 0.3s ease reverse';
            setTimeout(function() {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    // 視窗大小改變時的處理
    window.addEventListener('resize', function() {
        // 桌面版時展開所有分類連結
        if (window.innerWidth > 768) {
            menuCategories.forEach(function(category) {
                category.classList.remove('expanded');
            });
        }
    });
    
    // 頁面載入完成
    console.log('✅ Portal Hub 載入完成！');
    console.log('📚 歡迎使用中山大學入口網站模板');
    console.log('💡 提示：這是教學用模板，學生可以自由修改！');
});
