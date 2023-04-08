let saturate = document.getElementById("saturate");

let contrast = document.getElementById("contrast");

let brightness = document.getElementById("brightness");

let sepia = document.getElementById("sepia");

let grayscale = document.getElementById("grayscale");

let effect = document.getElementById("blur");

let hueRotate = document.getElementById("hue-rotate");

let upload = document.getElementById("upload");

let download = document.getElementById("download");

let img = document.getElementById("img");
console.log(img);

let reset = document.querySelector("span");
console.log(reset);

let imgbox = document.querySelector(".img-box");
console.log(imgbox);
// كانفاس ده عنصر بيتم نسخ فيه حاجة معينة لان اللغة مبتتعدمش تحميل الصور بالتأثيرات
let canvas = document.getElementById("canvas");
// دي الحاجة الي بننسخ فيها
let ctx = canvas.getContext("2d");

window.onload = function () {
  download.style.display = "none";
  reset.style.display = "none";
  imgbox.style.display = "none";
};

// رفع الصورة
// معملناش اونكلش علشان الانبت فايل الجافا سكربت بتشوفو اراي فيه داتا فا بالتالي اولنا لما الداتا تتغير اعمل فانكشن
upload.onchange = function () {
  resetValue();
  download.style.display = "block";
  reset.style.display = "block";
  imgbox.style.display = "block";
  // كلاس الفايل ريدر كلاس بيقرأ الملفات و بيحطها في اراي
  let file = new FileReader();
  // اقرأ الملف الي هتجيلك من الابلود وحطو في الاراي فايلز اندكس 0
  file.readAsDataURL(upload.files[0]);

  file.onload = function () {
    img.src = file.result;
  };
  //    لما الصورة تتحمد تتنسخ للكانفاس و تتمسح و ال سي
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
};

// تحديد كل الفلترز و عمل الستايل بتاع الصورة علي الساس الفاليو بتاع الفلتر

let filters = document.querySelectorAll("ul li input");

filters.forEach((filter) => {
  filter.addEventListener("input", function () {
    ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${effect.value}px)
        hue-rotate(${hueRotate.value}deg)
        `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});
// لما اضيف صورة جديد كل الفلاتر تتلغي
function resetValue() {
  ctx.filter = "none";
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  effect.value = "0";
  hueRotate.value = "0";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}
// reset
reset.onclick = function () {
  resetValue();
};

download.onclick = function () {
  download.href = canvas.toDataURL("image/jpeg");
};
