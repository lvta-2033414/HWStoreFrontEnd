export const cpuOptions = {
  'Thương hiệu': ['Tất cả', 'AMD', 'INTEL'],
  Series: [
    'Tất cả',
    'Core i3',
    'Core i5',
    'Core i7',
    'Core i9',
    'Ryzen 5',
    'Ryzen 7',
    'Ryzen 9',
  ],
  'Số nhân': ['Tất cả', 4, 6, 8, 10, 12, 16],
};

export const mainOptions = {
  'Thương hiệu': ['Tất cả', 'MSI', 'GIGABYTE', 'ASUS', 'ASROCK'],
  Chipset: ['Tất cả', 'X570', 'Z690'],
};

export const ramOptions = {
  'Thương hiệu': ['Tất cả', 'GSKILL', 'CORSAIR', 'KLEVV'],
  'Dung lượng': ['Tất cả', '8GB', '16GB', '32GB'],
};

export const vgaOptions = {
  'Thương hiệu': ['Tất cả', 'MSI', 'GIGABYTE', 'ASUS', 'EVGA'],
  Chipset: ['Tất cả', 'NVIDIA', 'AMD'],
};

export const hddOptions = {
  'Thương hiệu': ['Tất cả', 'WD', 'SEAGATE'],
  'Dung lượng': ['Tất cả', '120GB', '250GB', '500GB', '1TB', '2TB'],
};

export const psuOptions = {
  'Thương hiệu': ['Tất cả'],
};

export const caseOptions = {
  'Thương hiệu': ['Tất cả', 'NZXT', 'INFINITY', 'GIGABYTE', 'DEEPCOOL'],
};

export const keyboardOptions = {
  'Thương hiệu': ['Tất cả'],
};

export const displayOptions = {
  'Thương hiệu': ['Tất cả'],
  'Kích thước': ['Tất cả', '24 inch', '27 inch', '32 inch', '34 inch'],
};

export const converter = (input) => {
  let result;
  switch (input) {
    case 'Thương hiệu':
      result = 'brand';
      break;
    case 'Số nhân':
      result = 'Core';
      break;
    case 'Dung lượng':
      result = 'Capacity';
      break;
    case 'Kích thước':
      result = 'Size';
      break;
  }
  return result;
};
