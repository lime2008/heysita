async function md5(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('MD5', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
  
  async function getGravatarUrl(email: string): Promise<string> {
    const hash = await md5(email.trim().toLowerCase());
    return `https://cravatar.cn/avatar/${hash}?s=512&r=pg`;
  }
  
 function getQqAvatarUrl(qqNumber: string): string {
    return `https://q2.qlogo.cn/headimg_dl?dst_uin=${qqNumber}&spec=5`;
  }
  
  export async function getAvatarUrl(email: string): Promise<string> {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      throw new Error('Invalid email address');
    }
  
    const [localPart, domain] = email.split('@');
  
    if (domain !== 'qq.com') {
      throw new Error('Not a QQ email address');
    }
  
    const isNumeric = /^\d+$/.test(localPart);
  
    if (isNumeric) {
      return getQqAvatarUrl(localPart);
    } else {
      return getGravatarUrl(email);
    }
  }
  