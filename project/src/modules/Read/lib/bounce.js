export default function (distance) {
  var a = 1.005
  var b = 0.6
  if (distance > 0) {
    return ~~(-1 / (b * Math.pow(a, b * distance) * Math.log(a)) + 1 / Math.log(a) / b) / 2
  } else {
    return -~~(-1 / (b * Math.pow(a, b * (-distance)) * Math.log(a)) + 1 / Math.log(a) / b) / 2
  }
}
