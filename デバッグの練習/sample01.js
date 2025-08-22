// 引数を足し算するsumUp関数
function sumUp(a, b) {
    return a + b;
}

// 1から100までの合計を計算
let total = 0;
for (let i = 1; i <= 100; i++) {
    total = sumUp(total, i);
}

// 結果を画面に表示
sole.log("1から100までの合計: " + total);

// HTMLページで表示する場合
document.addEventListener('DOMContentLoaded', function() {
    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.textContent = "1から100までの合計: " + total;
    }
});
