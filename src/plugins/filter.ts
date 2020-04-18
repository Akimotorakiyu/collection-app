import Vue from "vue";

Vue.filter(
  "num2str",
  (
    value: number | string,
    toFixed: number = 2,
    zeroRep: string = "",
    undef: string = "-"
  ) => {
    if (isNaN(value as any)) {
      return undef;
    } else {
      const numberValue = parseFloat(value + "");
      return numberValue === 0 ? zeroRep : numberValue.toFixed(toFixed);
    }
  }
);
