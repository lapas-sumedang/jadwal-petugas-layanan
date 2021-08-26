$(document).ready(function () {
  $(".chosen").chosen();
  formPlpm1();
  formPlpm2();
  formDl();
  formPu();
  formPm();
  formPengawasK();
  formPetugasK();
});

function formPlpm1() {
  var base_url = "https://www.radhiansobarna.com/api/elsa/pegawai/data";
  var formInput = document.getElementById("plpm");
  var formInputU = document.getElementById("plpmU");
  formInput.innerHTML = '<option value="">--Petugas 1--</option>';
  formInputU.innerHTML = '<option value="">--Petugas 1--</option>';
  $.ajax({
    type: "POST",
    url: base_url,
    dataType: "json",
    success: function (hasil) {
      for (var i = 0; i < hasil.length; i++) {
        var item = hasil[i];
        formInput.innerHTML += `<option value="${item.pegawai_nip}">${item.pegawai_nama}</option>`;
        formInputU.innerHTML += `<option value="${item.pegawai_nip}">${item.pegawai_nama}</option>`;
      }
    },
  });
}

function formPlpm2() {
  var base_url = "https://www.radhiansobarna.com/api/elsa/pegawai/data";
  var formInput = document.getElementById("plpm2");
  var formInputU = document.getElementById("plpm2U");
  formInput.innerHTML = '<option value="">--Petugas 2--</option>';
  formInputU.innerHTML = '<option value="">--Petugas 1--</option>';
  $.ajax({
    type: "POST",
    url: base_url,
    dataType: "json",
    success: function (hasil) {
      for (var i = 0; i < hasil.length; i++) {
        var item = hasil[i];
        formInput.innerHTML += `<option value="${item.pegawai_nip}">${item.pegawai_nama}</option>`;
        formInputU.innerHTML += `<option value="${item.pegawai_nip}">${item.pegawai_nama}</option>`;
      }
    },
  });
}

function formDl() {
  var base_url = "https://www.radhiansobarna.com/api/elsa/pegawai/data";
  var formInput = document.getElementById("dl");
  var formInputU = document.getElementById("dlU");
  formInput.innerHTML = '<option value="">--Pilih--</option>';
  formInputU.innerHTML = '<option value="">--Pilih--</option>';
  $.ajax({
    type: "POST",
    url: base_url,
    dataType: "json",
    success: function (hasil) {
      for (var i = 0; i < hasil.length; i++) {
        var item = hasil[i];
        formInput.innerHTML += `<option value="${item.pegawai_nip}">${item.pegawai_nama}</option>`;
        formInputU.innerHTML += `<option value="${item.pegawai_nip}">${item.pegawai_nama}</option>`;
      }
    },
  });
}

function formPu() {
  var base_url = "https://www.radhiansobarna.com/api/elsa/pegawai/data";
  var formInput = document.getElementById("pu");
  var formInputU = document.getElementById("puU");
  formInput.innerHTML = '<option value="">--Pilih--</option>';
  formInputU.innerHTML = '<option value="">--Pilih--</option>';
  $.ajax({
    type: "POST",
    url: base_url,
    dataType: "json",
    success: function (hasil) {
      for (var i = 0; i < hasil.length; i++) {
        var item = hasil[i];
        formInput.innerHTML += `<option value="${item.pegawai_nip}">${item.pegawai_nama}</option>`;
        formInputU.innerHTML += `<option value="${item.pegawai_nip}">${item.pegawai_nama}</option>`;
      }
    },
  });
}

function formPm() {
  var base_url = "https://www.radhiansobarna.com/api/elsa/pegawai/data";
  var formInput = document.getElementById("pm");
  var formInputU = document.getElementById("pmU");
  formInput.innerHTML = '<option value="">--Pilih--</option>';
  formInputU.innerHTML = '<option value="">--Pilih--</option>';
  $.ajax({
    type: "POST",
    url: base_url,
    dataType: "json",
    success: function (hasil) {
      for (var i = 0; i < hasil.length; i++) {
        var item = hasil[i];
        formInput.innerHTML += `<option value="${item.pegawai_nip}">${item.pegawai_nama}</option>`;
        formInputU.innerHTML += `<option value="${item.pegawai_nip}">${item.pegawai_nama}</option>`;
      }
    },
  });
}

function formPengawasK() {
  var base_url = "https://www.radhiansobarna.com/api/elsa/pegawai/data";
  var formInput = document.getElementById("pengawask");
  var formInputU = document.getElementById("pengawaskU");
  formInput.innerHTML = '<option value="">--Pilih--</option>';
  formInputU.innerHTML = '<option value="">--Pilih--</option>';
  $.ajax({
    type: "POST",
    url: base_url,
    dataType: "json",
    success: function (hasil) {
      for (var i = 0; i < hasil.length; i++) {
        var item = hasil[i];
        formInput.innerHTML += `<option value="${item.pegawai_nip}">${item.pegawai_nama}</option>`;
        formInputU.innerHTML += `<option value="${item.pegawai_nip}">${item.pegawai_nama}</option>`;
      }
    },
  });
}

function formPetugasK() {
  var base_url = "https://www.radhiansobarna.com/api/elsa/pegawai/data";
  var formInput = document.getElementById("petugask");
  var formInputU = document.getElementById("petugaskU");
  formInput.innerHTML = '<option value="">--Pilih--</option>';
  formInputU.innerHTML = '<option value="">--Pilih--</option>';
  $.ajax({
    type: "POST",
    url: base_url,
    dataType: "json",
    success: function (hasil) {
      for (var i = 0; i < hasil.length; i++) {
        var item = hasil[i];
        formInput.innerHTML += `<option value="${item.pegawai_nip}">${item.pegawai_nama}</option>`;
        formInputU.innerHTML += `<option value="${item.pegawai_nip}">${item.pegawai_nama}</option>`;
      }
    },
  });
}
