export function Validation1(elements) {
  //check if the surface of romanian counties is lower than Romania's Surface
  const TableCountries = elements.find((element) => element.id === 1);
  const TableCountiesOfRomania = elements.find((element) => element.id === 4);
  const sumofCountiesSurface = TableCountiesOfRomania.data.reduce(
    (prev, current) => prev + current.surface,
    0
  );
  console.log("validez,,,");
  console.log({ sumofCountiesSurface });
  console.log(TableCountries.data[0].surface);
  if (TableCountries.data[0].surface < sumofCountiesSurface)
    return {
      error: true,
      errorMessage: `Surface of romania counties is bigger than romania's surface, comparing ${TableCountries.data[0].surface} with ${sumofCountiesSurface}. Elements id: 1 and 4`,
    };
  return {
    error: false,
  };
}

export function Validation2(elements) {
  //check if the surface of romanian counties is lower than Romania's Surface
  const TableCountries = elements.find((element) => element.id === 1);
  const TableCountiesOfRomania = elements.find((element) => element.id === 4);
  const sumofCountiesSurface = TableCountiesOfRomania.data.reduce(
    (prev, current) => prev + current.surface,
    0
  );
  console.log("validez,,,");
  console.log({ sumofCountiesSurface });
  console.log(TableCountries.data[0].surface);
  if (TableCountries.data[0].surface < sumofCountiesSurface)
    return {
      error: true,
      errorMessage: `Surface of romania counties is bigger than romania's surface, comparing ${TableCountries.data[0].surface} with ${sumofCountiesSurface}. Elements id: 1 and 4`,
    };
  return {
    error: false,
  };
}
