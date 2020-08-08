const convert = () => {
  const number = $("#binary").val();
  if (number === "") {
    $("#alert").removeClass("d-none");
    $("#result").addClass("d-none");
  } else {
    if (/^([1|0])*$/.test(number)) {
      $("#alert").addClass("d-none");
      $("#result").removeClass("d-none");
      $("#numberConverted").text(
        `El numero binario: ${number} convertido a decimal es: ${parseInt(
          String(number),
          2
        )}`
      );
    } else {
      $("#alert").removeClass("d-none");
      $("#result").addClass("d-none");
    }
  }
};
