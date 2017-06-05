// 1-创建数据库
var db = openDatabase('yyy', '1.0', 'message content', 5 * 1024 * 1024);

// 2-创建数据表  ASC 正序 Desc 倒序
db.transaction(function(tx) {
    tx.executeSql("create table if not exists message (id integer primary key asc, content text, created_time text)")
})

loadContent();
// 3- 获取表单
var msgContent = document.getElementById('note-form');
// console.log(msgContent)
// 3-1 获取表单的内容
var content = msgContent.elements['note-content'];
// console.log(content);
// 3-2 当键盘抬起的时候自动存储表单的内容
content.addEventListener('keyup', function() {
    localStorage.setItem('content', content.value);
});
// 3-3 当页面刷新的时候，把本地存储的内容直接给表单赋值
content.value = localStorage.getItem('content');

// 4 提交留言
function submitContent(event) {
    event.preventDefault(); //取消默认事件
    // 获取表单的内容，插入到数据库里面
    var contentValue = content.value;
    // 6-2 获取提交按钮状态 
    var status = msgContent.elements['submit-btn'].value;
    // 6-3 获取隐藏域input 编辑的id
    var msgId = msgContent.elements['note-id'].value;
    if (status === 'submit') { // 6-4
        //  按钮为提交状态 提交留言数据  并刷新留言内容（回调函数） // 4-1 回调函数onSuccess  onError
        db.transaction(function(tx) {
            tx.executeSql("insert into message (content, created_time) values (?, DAtetime('now','localtime'))", [contentValue], onSuccess, onError);
        });
    } else {
        // 6-5 当 按钮为更新状态 修改留言 并刷新留言内容（回调函数）
        db.transaction(function(tx) {
            tx.executeSql("update message set content = ? where id = ?", [contentValue, msgId], onSuccess, onError);
        });
    }
}
// 4-2
function onSuccess(tx, res) {
    console.log('成功');
    loadContent(); // 当每次调用onSuccess() 函数的时候  也会执行loadContent() （读取数据库数据 并输出到页面  实现页面局部内容刷新功能）
}
// 4-3  
function onError(tx, e) {
    console.log('失败' + e.message);
}
// 4-4提交  回调函数submitContent （提交内容）
var submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', submitContent);

// 显示留言里面的内容
// 4-4-2 数据库内容上传页面 
function displayContent(tx, res) {
    var contentContainer = document.getElementById('note-list');
    contentContainer.innerHTML = "";
    for (var i = 0; i < res.rows.length; i++) {
        var contentEntry = res.rows.item(i);
        contentContainer.innerHTML += `
                    <li class="list-group-item"> 
                        ${contentEntry.content}
                        <div class="btn-group btn-group-xs pull-right">
                            <button class="btn btn-default"   onclick="deleteContent(${contentEntry.id})" > 删除 </button>
                            <button class="btn btn-default"   onclick="editContent(${contentEntry.id})" > 编辑 </button>
                            <small class="pull-right note-date">
                            </small>
                        </div>
                    </li>`;

    }
}
// 4-4-1 查询语句 查询数据库内容（displayContent 回调函数）
function loadContent() {
    db.transaction(function(tx) {
        tx.executeSql("select * from message order by id desc", [], displayContent, onError);
    });
}

// 5 删除事件
function deleteContent(id) {
    db.transaction(function(tx) {
        tx.executeSql('delete from message where id = ?', [id], onSuccess, onError)
    })
}

// 6-1  编辑事件 （点击按钮查询当前语句 并修改提交按钮所需属性）
function editContent(id) {
    db.transaction(function(tx) {
        tx.executeSql('select * from message where id = ?', [id], function(tx, res) {
            content.value = res.rows.item(0).content;
            msgContent.elements['submit-btn'].value = 'update';
            msgContent.elements['submit-btn'].innerHTML = '更新';
            msgContent.elements['note-id'].value = id;
        })
    })
}