$(document).ready(function () {
  var table;
  getData();

  $(".datepicker").datepicker({
    autoclose: true,
    format: "yyyy-mm-dd",
  });
});

$("#month").on("change", function () {
  table.ajax.reload();
});

function getData() {
  table = $("#table_1").DataTable({
    processing: true,
    serverSide: true,
    info: true,
    order: [],
    pageLength: 10,

    lengthChange: true,

    scrollX: true,

    ajax: {
      url: "https://www.radhiansobarna.com/api/elsa/pegawai",
      type: "POST",
    },

    columnDefs: [
      {
        targets: [3],
        orderable: false,
      },
    ],
  });
}

function detailData(id) {
  var base_url = "https://www.radhiansobarna.com/api/elsa/pegawai/getData";
  disable();
  $.ajax({
    type: "POST",
    data: "id=" + id,
    url: base_url,
    dataType: "json",
    success: function (hasil) {
      $("#idpegawai").val(hasil[0].pegawai_id);
      $("#nipU").val(hasil[0].pegawai_nip);
      $("#nmpegawaiU").val(hasil[0].pegawai_nama);
      enable();
      document.body.style.paddingRight = "0px";
    },
  });
}

function proses_tambah() {
  let nip = $("#nip").val();
  let nmpegawai = $("#nmpegawai").val();
  loadingklik();
  disable();
  if (nip == "") {
    pesan("Oops..", "NIP harus di isi!", "warning");
  } else if (nmpegawai == "") {
    pesan("Oops..", "Nama Pegawai harus di isi!", "warning");
  } else {
    var postForm = {
      nip: nip,
      nmpegawai: nmpegawai,
    };
    $.ajax({
      url: "https://www.radhiansobarna.com/api/elsa/pegawai/proses_tambah",
      type: "POST",
      data: postForm,
      dataType: "json",
      success: function (hasil) {
        console.log(hasil.pesan);
        if (hasil.pesan == "success") {
          pesan("Berhasil..", "Data berhasil ditambah.", "success");
          hapusForm();
          document.body.style.paddingRight = "0px";
          $("#exampleModal").modal("toggle");
          table.ajax.reload();
          enable();
        } else {
          pesan("Oops..", "Data gagal ditambah.", "warning");
          enable();
          document.body.style.paddingRight = "0px";
        }
      },
    });
  }
}

function proses_ubah() {
  let idpegawai = $("#idpegawai").val();
  let nip = $("#nipU").val();
  let nmpegawai = $("#nmpegawaiU").val();
  loadingklik();
  disable();
  if (nip == "") {
    pesan("Oops..", "NIP harus di isi!", "warning");
    enable();
  } else if (nmpegawai == "") {
    pesan("Oops..", "Nama Pegawai harus di isi!", "warning");
    enable();
  } else {
    var postForm = {
      idpegawai: idpegawai,
      nip: nip,
      nmpegawai: nmpegawai,
    };
    $.ajax({
      url: "https://www.radhiansobarna.com/api/elsa/pegawai/proses_ubah",
      type: "POST",
      data: postForm,
      dataType: "json",
      success: function (hasil) {
        console.log(hasil.pesan);
        if (hasil.pesan == "success") {
          pesan("Berhasil..", "Data berhasil diubah.", "success");
          hapusForm();
          enable();
          document.body.style.paddingRight = "0px";
          $("#exampleModalU").modal("toggle");
          table.ajax.reload();
        } else {
          pesan("Oops..", "Data gagal diubah.", "warning");
          enable();
          document.body.style.paddingRight = "0px";
        }
      },
    });
  }
}

function proses_hapus(id) {
  var postForm = {
    id: id,
  };
  $.ajax({
    url: "https://www.radhiansobarna.com/api/elsa/pegawai/proses_hapus",
    type: "POST",
    data: postForm,
    dataType: "json",
    success: function (hasil) {
      console.log(hasil.pesan);
      if (hasil.pesan == "success") {
        pesan("Berhasil..", "Data berhasil dihapus.", "success");
        table.ajax.reload();
        document.body.style.paddingRight = "0px";
      } else {
        pesan("Oops..", "Data gagal dihapus.", "warning");
        document.body.style.paddingRight = "0px";
      }
    },
  });
}

function hapusData(id) {
  swal
    .fire({
      title: "Hapus Data ini?",
      icon: "warning",
      closeOnClickOutside: false,
      showCancelButton: true,
      confirmButtonText: "Iya",
      confirmButtonColor: "#198754",
      cancelButtonText: "Batal",
      cancelButtonColor: "#d33",
    })
    .then((result) => {
      if (result.value) {
        loadingklik();
        proses_hapus(id);
      }
    });
}

function pesan(judulpesan, pesan, icon) {
  swal.fire({
    title: judulpesan,
    text: pesan,
    icon: icon,
    confirmButtonColor: "#198754",
  });
}

function hapusForm() {
  let nip = $("#nip");
  let nmpegawai = $("#nmpegawai");
  let idpegawai = $("#idpegawai");
  let nipU = $("#nipU");
  let nmpegawaiU = $("#nmpegawaiU");

  nip.val("");
  nmpegawai.val("");
  idpegawai.val("");
  nipU.val("");
  nmpegawaiU.val("");
}

function loadingklik() {
  Swal.fire({
    title: "Memuat...",
    onBeforeOpen: () => {
      Swal.showLoading();
    },
    showCloseButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    focusConfirm: false,
  });
}

function disable() {
  $("#bSubmit").hide();
  $("#bSubmitDisable").show();
}

function enable() {
  $("#bSubmit").show();
  $("#bSubmitDisable").hide();
}
