$(document).ready(function () {
  getDataNow();
});

function getDataNow() {
  var base_url = "https://www.radhiansobarna.com/api/elsa/tugaspelayanan/getDataNow";
  $.ajax({
    type: "POST",
    url: base_url,
    dataType: "json",
    success: function (hasil) {
      if (hasil.length > 0) {
        $("#plpm").text(hasil[0].plk_plpm);
        $("#dl").text(hasil[0].plk_dl);
        $("#ppu").text(hasil[0].plk_pu);
        $("#ppm").text(hasil[0].plk_pm);
        hideJadwal(false);
        hidePesan(true);
      } else {
        $("#plpm").text("-");
        $("#dl").text("-");
        $("#ppu").text("-");
        $("#ppm").text("-");
        hideJadwal(true);
        hidePesan(false);
      }
    },
  });
}

function hideJadwal(bool) {
  if (bool == true) {
    $("#tugasPelayanan").removeClass("d-block");
    $("#tugasPelayanan").addClass("d-none");
  } else {
    $("#tugasPelayanan").removeClass("d-none");
    $("#tugasPelayanan").addClass("d-block");
  }
}

function hidePesan(bool) {
  if (bool == true) {
    $("#pesanKosong").removeClass("d-block");
    $("#pesanKosong").addClass("d-none");
  } else {
    $("#pesanKosong").removeClass("d-none");
    $("#pesanKosong").addClass("d-block");
  }
}
// 1 detik = 1000
window.setTimeout("waktu()", 1000);

function waktu() {
  var tanggal = new Date();
  setTimeout("waktu()", 1000);

  var jam = tanggal.getHours();
  var menit = tanggal.getMinutes();
  var detik = tanggal.getSeconds();

  if (jam < 10) {
    jam = "0" + tanggal.getHours();
  }

  if (menit < 10) {
    menit = "0" + tanggal.getMinutes();
  }

  if (detik < 10) {
    detik = "0" + tanggal.getSeconds();
  }
  document.getElementById("jam").innerHTML = '<i class="far fa-clock mr-1"></i>&nbsp;' + jam + ":" + menit + ":" + detik;
}

var tanggallengkap = new String();
var namahari = "Minggu Senin Selasa Rabu Kamis Jumat Sabtu";
namahari = namahari.split(" ");
var namabulan = "Januari Februari Maret April Mei Juni Juli Agustus September Oktober November Desember";
namabulan = namabulan.split(" ");
var tgl = new Date();
var hari = tgl.getDay();
var tanggal = tgl.getDate();
var bulan = tgl.getMonth();
var tahun = tgl.getFullYear();

document.getElementById("hari").innerHTML = '<i class="far fa-calendar-alt mr-1"></i>&nbsp;' + namahari[hari] + ", " + tanggal + " " + namabulan[bulan] + " " + tahun;
