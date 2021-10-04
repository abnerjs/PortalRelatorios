export function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xbb;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
}

export function getInitialsFromString(string: string) {
  var arr: string[];
  arr = string.trim().split(' ');
  var aux: string = '';
  aux += arr[0].charAt(0);

  if (arr.length > 1) aux += arr[arr.length - 1].charAt(0);

  return aux
}
