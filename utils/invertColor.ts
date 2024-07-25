export function invertHexColor(hex : string) {
    // 移除可能存在的 #
    hex = hex.replace(/^#/, '');
  
    // 如果是3位的hex值，转换成6位的
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
  
    // 检查是否是有效的6位hex值
    if (hex.length !== 6) {
      throw new Error('Invalid hex color format');
    }
  
    // 计算每个颜色分量的相反色
    let invertedColor = '#';
    for (let i = 0; i < 3; i++) {
      let colorComponent = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
      let invertedComponent = (255 - colorComponent).toString(16);
      // 确保每个分量是两位数
      if (invertedComponent.length === 1) {
        invertedComponent = '0' + invertedComponent;
      }
      invertedColor += invertedComponent;
    }
  
    return invertedColor;
  }

  