function autocomplete(input, latInput, lngInput) {
  if (!input) return; // short-circuit out of no input

  const dropdown = new google.maps.places.Autocomplete(input);

  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();

    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });

  // Prevent default behavior of enter key
  input.on('keydown', e => {
    if (e.keyCode === 13) e.preventDefault();
  });
}

export default autocomplete;
