export function keyCodeNumberRange(keyCode) {
    if (keyCode > 95 && keyCode < 106 || keyCode > 47 && keyCode < 58 || keyCode === 8 || keyCode === 46 || keyCode === 37 || keyCode === 39 || keyCode === 110 || keyCode === 190) {
        return true;
    } else {
        return false;
    }
}

export function roundTo(num, e = 3) {
    return +(Math.round(num + `e+${e}`) + `e-${e}`);
}