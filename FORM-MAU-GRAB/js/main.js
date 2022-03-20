// GrabX
const GRABX_1 = 8000;
const GRABX_2 = 7500;
const GRABX_3 = 7000;
const GRABX_WAIT = 2000;

// GrabSUV
const GRABSUV_1 = 9000;
const GRABSUV_2 = 8500;
const GRABSUV_3 = 8000;
const GRABSUV_WAIT = 3000;

// GrabBLACK
const GRABBLACK_1 = 10000;
const GRABBLACK_2 = 9500;
const GRABBLACK_3 = 9000;
const GRABBLACK_WAIT = 3500;
var tienKm_1 = 0;
var tienKm_2 = 0;
var tienKm_3 = 0;
var tongTien = 0;
var tienCho = 0;
var contentInHD = "";

document.getElementById("btnHoaDon").disabled = true;
document.getElementById("btnTinhTien").onclick = function () {
  var soKm = document.getElementById("soKM").value;
  var tgCho = document.getElementById("tgCho").value;
  var currentFormat = new Intl.NumberFormat("vn-VN");
  var loaiXe = layLoaiXe();

  switch (loaiXe) {
    case "grabX":
      // tính tiền grabX
      tinhTienChiTiet(soKm, tgCho, GRABX_WAIT, GRABX_1, GRABX_2, GRABX_3);
      inHoaDon(soKm, tgCho, GRABX_WAIT, GRABX_1, GRABX_2, GRABX_3);
      break;
    case "grabSUV":
      // tính tiền grabSUV
      tinhTienChiTiet(
        soKm,
        tgCho,
        GRABSUV_WAIT,
        GRABSUV_1,
        GRABSUV_2,
        GRABSUV_3
      );
      inHoaDon(soKm, tgCho, GRABSUV_WAIT, GRABSUV_1, GRABSUV_2, GRABSUV_3);
      break;
    case "grabBlack":
      // tính tiền grabBlack
      tinhTienChiTiet(
        soKm,
        tgCho,
        GRABBLACK_WAIT,
        GRABBLACK_1,
        GRABBLACK_2,
        GRABBLACK_3
      );
      inHoaDon(
        soKm,
        tgCho,
        GRABBLACK_WAIT,
        GRABBLACK_1,
        GRABBLACK_2,
        GRABBLACK_3
      );
      break;

    default:
      alert("Vui lòng chọn loại xe!");
      break;
  }

  document.getElementById("divThanhTien").style.display = "block";
  document.getElementById("xuatTien").innerHTML =
    currentFormat.format(tongTien);
  document.getElementById("btnHoaDon").disabled = false;
};

// Hàm lấy loại xe
function layLoaiXe() {
  var grabX = document.getElementById("grabX");
  var grabSUV = document.getElementById("grabSUV");
  var grabBlack = document.getElementById("grabBlack");
  var loaiXe = "";

  if (grabX.checked) {
    loaiXe = "grabX";
  } else if (grabSUV.checked) {
    loaiXe = "grabSUV";
  } else if (grabBlack.checked) {
    loaiXe = "grabBlack";
  }

  return loaiXe;
}

// Hàm tính tiền chờ
function tinhTienCho(tgCho, giaCho) {
  var kq = 0;
  if (tgCho >= 3) {
    kq = Math.floor(tgCho / 3) * giaCho;
  }
  return kq;
}

// Hàm tính tiền Km

function tinhKm_1(soKm, giaKM) {
  var kq = soKm * giaKM;
  return kq;
}

function tinhKm_2(soKm, giaKM) {
  var kq = (soKm - 1) * giaKM;
  return kq;
}

function tinhKm_3(soKm, giaKM) {
  var kq = (soKm - 19) * giaKM;
  return kq;
}

// Tính tiền chi tiết
function tinhTienChiTiet(soKm, tgCho, giaCho, giaKm_1, giaKm_2, giaKm_3) {
  tienCho = tinhTienCho(tgCho, giaCho);
  if (0 <= soKm && soKm <= 1) {
    tienKm_1 = tinhKm_1(soKm, giaKm_1);
    tongTien = tienKm_1 + tienCho;
  } else if (1 < soKm && soKm <= 19) {
    tienKm_1 = tinhKm_1(1, giaKm_1);
    tienKm_2 = tinhKm_2(soKm, giaKm_2);
    tongTien = tienKm_1 + tienKm_2 + tienCho;
  } else if (soKm > 19) {
    tienKm_1 = tinhKm_1(1, giaKm_1);
    tienKm_2 = tinhKm_2(19, giaKm_2);
    tienKm_3 = tinhKm_3(soKm, giaKm_3);
    tongTien = tienKm_1 + tienKm_2 + tienKm_3 + tienCho;
  }
}

// In hóa đơn
document.getElementById("btnHoaDon").onclick = function () {
  document.getElementById("tbody").innerHTML = contentInHD;
};

function inHoaDon(soKm, tgCho, giaCho, giaKm_1, giaKm_2, giaKm_3) {
  if (0 <= soKm && soKm <= 1) {
    contentInHD += "<tr>";
    contentInHD += "<td>Km đầu tiên</td>";
    contentInHD += "<td>" + soKm + "</td>";
    contentInHD += "<td>" + giaKm_1 + "</td>";
    contentInHD += "<td>" + tienKm_1 + "</td>";
    contentInHD += "</tr>";

    contentInHD += "<tr>";
    contentInHD += "<td>Thời gian chờ</td>";
    contentInHD += "<td>" + tgCho + "</td>";
    contentInHD += "<td>" + giaCho + "</td>";
    contentInHD += "<td>" + tienCho + "</td>";
    contentInHD += "</tr>";

    contentInHD += "<tr>";
    contentInHD += "<td colspan='3' style='text-align: right'>Tổng tiền: </td>";
    contentInHD += "<td" + tongTien + "</td>";
    contentInHD += "</tr>";
  } else if (1 < soKm && soKm <= 19) {
    contentInHD += "<tr>";
    contentInHD += "<td>Km đầu tiên</td>";
    contentInHD += "<td>" + 1 + "</td>";
    contentInHD += "<td>" + giaKm_1 + "</td>";
    contentInHD += "<td>" + tienKm_1 + "</td>";
    contentInHD += "</tr>";

    contentInHD += "<tr>";
    contentInHD += "<td>Từ " + 1 + " đến " + soKm + "</td>";
    contentInHD += "<td>" + (soKm - 1) + "</td>";
    contentInHD += "<td>" + giaKm_2 + "</td>";
    contentInHD += "<td>" + tienKm_2 + "</td>";
    contentInHD += "</tr>";

    contentInHD += "<tr>";
    contentInHD += "<td>Thời gian chờ</td>";
    contentInHD += "<td>" + tgCho + "</td>";
    contentInHD += "<td>" + giaCho + "</td>";
    contentInHD += "<td>" + tienCho + "</td>";
    contentInHD += "</tr>";

    contentInHD += "<tr>";
    contentInHD += "<td colspan='3' style='text-align: right'>Tổng tiền: </td>";
    contentInHD += "<td>" + tongTien + "</td>";
    contentInHD += "</tr>";
  } else if (19 < soKm) {
    contentInHD += "<tr>";
    contentInHD += "<td>Km đầu tiên</td>";
    contentInHD += "<td>" + 1 + "</td>";
    contentInHD += "<td>" + giaKm_1 + "</td>";
    contentInHD += "<td>" + tienKm_1 + "</td>";
    contentInHD += "</tr>";

    contentInHD += "<tr>";
    contentInHD += "<td>Từ " + 1 + " đến " + 19 + "</td>";
    contentInHD += "<td>" + (19 - 1) + "</td>";
    contentInHD += "<td>" + giaKm_2 + "</td>";
    contentInHD += "<td>" + tienKm_2 + "</td>";
    contentInHD += "</tr>";

    contentInHD += "<tr>";
    contentInHD += "<td>Từ " + 19 + " đến " + soKm + "</td>";
    contentInHD += "<td>" + (soKm - 19) + "</td>";
    contentInHD += "<td>" + giaKm_3 + "</td>";
    contentInHD += "<td>" + tienKm_3 + "</td>";
    contentInHD += "</tr>";

    contentInHD += "<tr>";
    contentInHD += "<td>Thời gian chờ</td>";
    contentInHD += "<td>" + tgCho + "</td>";
    contentInHD += "<td>" + giaCho + "</td>";
    contentInHD += "<td>" + tienCho + "</td>";
    contentInHD += "</tr>";

    contentInHD += "<tr>";
    contentInHD += "<td colspan='3' style='text-align: right'>Tổng tiền: </td>";
    contentInHD += "<td>" + tongTien + "</td>";
    contentInHD += "</tr>";
  }
}
