// Generator file template MikroTik RouterOS
export function generateMikrotikFiles(config) {
  const primaryColor = config.primaryColor || '#2563eb';
  const secondaryColor = config.secondaryColor || '#1e40af';
  const bgColor = config.bgColor || '#0f172a';
  const cardOpacity = config.cardOpacity !== undefined ? config.cardOpacity : 0.9;
  const cardBlur = config.cardBlur !== undefined ? config.cardBlur : 16;
  const cardBg = config.darkMode 
    ? `rgba(30, 41, 59, ${cardOpacity})` 
    : `rgba(255, 255, 255, ${cardOpacity})`;
  const textColor = config.darkMode ? '#f8fafc' : '#0f172a';
  const mutedColor = config.darkMode ? '#94a3b8' : '#64748b';
  const borderCol = config.darkMode ? 'rgba(51, 65, 85, 0.6)' : 'rgba(226, 232, 240, 0.8)';

  // Background styling (solid, gradient, or image)
  let bodyBgStyle = `background-color: ${bgColor};`;
  if (config.bgType === 'image' && config.bgImageUrl) {
    bodyBgStyle = `background: linear-gradient(rgba(0,0,0,${config.bgOverlay || 0.45}), rgba(0,0,0,${config.bgOverlay || 0.45})), url('${config.bgImageUrl}') center/cover no-repeat fixed;`;
  }

  // md5.js standar RouterOS untuk enkripsi password CHAP
  const md5Js = `/* MD5 implementation for MikroTik CHAP */
function hexMD5(s){return binl2hex(coreMD5(str2binl(s)));}
function coreMD5(x){
  var a=1732584193,b=-271733879,c=-1732584194,d=271733878;
  for(var i=0;i<x.length;i+=16){
    var olda=a,oldb=b,oldc=c,oldd=d;
    a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);
    a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);
    a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);
    a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);
    a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);
    a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);
    a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);
    a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);
    a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);
    a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);
    a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);
    a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);
    a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);
    a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);
    a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);
    a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);
    a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);
  }
  return [a,b,c,d];
}
function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}
function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);}
function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);}
function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t);}
function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t);}
function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}
function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}
function str2binl(str){var bin=[];var mask=(1<<8)-1;for(var i=0;i<str.length*8;i+=8)bin[i>>5]|=(str.charCodeAt(i/8)&mask)<<(i%32);return bin;}
function binl2hex(binarray){var hex_tab="0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++){str+=hex_tab.charAt((binarray[i>>2]>>((i%4)*8+4))&0xF)+hex_tab.charAt((binarray[i>>2]>>((i%4)*8))&0xF);}return str;}
`;

  // Render Paket Voucher HTML
  const voucherListHtml = (config.packages || []).map(pkg => `
      <div class="pkg-card">
        <div>
          <div class="pkg-name">${pkg.name}</div>
          <div class="pkg-desc">${pkg.desc || ''}</div>
        </div>
        <div class="pkg-price">${pkg.price}</div>
      </div>
  `).join('\n');

  // WhatsApp Link
  const waUrl = config.waNumber 
    ? `https://wa.me/${config.waNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(config.waMessage || 'Halo, saya mau beli voucher internet')}`
    : '#';

  // LOGIN.HTML
  const loginHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="expires" content="-1">
  <title>${config.brandName || 'Hotspot Login'}</title>
  <script src="md5.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    body { ${bodyBgStyle} color: ${textColor}; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 16px; }
    .container { width: 100%; max-width: 400px; background: ${cardBg}; border-radius: 20px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.35); border: 1px solid ${borderCol}; overflow: hidden; backdrop-filter: blur(${cardBlur}px); -webkit-backdrop-filter: blur(${cardBlur}px); }
    .header { text-align: center; padding: 24px 20px 16px; border-bottom: 1px solid ${borderCol}; }
    .logo { max-height: 64px; max-width: 160px; object-fit: contain; margin-bottom: 12px; }
    .brand-title { font-size: 20px; font-weight: 700; color: ${textColor}; }
    .brand-subtitle { font-size: 13px; color: ${mutedColor}; margin-top: 4px; }
    
    .notice { background: ${config.darkMode ? '#334155' : '#f1f5f9'}; color: ${textColor}; padding: 8px 12px; font-size: 12px; text-align: center; border-radius: 8px; margin: 16px 20px 0; }
    .error-box { background: #fee2e2; border: 1px solid #f87171; color: #b91c1c; padding: 10px 14px; font-size: 13px; border-radius: 8px; margin: 16px 20px 0; text-align: center; }

    .content { padding: 20px; }
    
    .tabs { display: flex; background: ${config.darkMode ? '#0f172a' : '#f1f5f9'}; padding: 4px; border-radius: 12px; margin-bottom: 18px; }
    .tab-btn { flex: 1; padding: 8px; font-size: 13px; font-weight: 600; text-align: center; border-radius: 8px; border: none; cursor: pointer; color: ${mutedColor}; background: transparent; transition: all 0.2s; }
    .tab-btn.active { background: ${cardBg}; color: ${primaryColor}; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

    .form-group { margin-bottom: 14px; text-align: left; }
    .form-label { display: block; font-size: 12px; font-weight: 600; color: ${mutedColor}; margin-bottom: 6px; }
    .form-input { width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid ${borderCol}; background: ${config.darkMode ? '#0f172a' : '#ffffff'}; color: ${textColor}; font-size: 14px; outline: none; transition: border 0.2s; }
    .form-input:focus { border-color: ${primaryColor}; ring: 2px solid ${primaryColor}; }

    .btn-submit { width: 100%; padding: 12px; background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}); color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.15); transition: opacity 0.2s; }
    .btn-submit:active { opacity: 0.9; }

    .trial-box { text-align: center; margin-top: 14px; }
    .trial-link { font-size: 13px; color: ${primaryColor}; text-decoration: none; font-weight: 600; }

    .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: ${mutedColor}; margin: 20px 0 10px; display: flex; align-items: center; justify-content: space-between; }
    .pkg-card { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: ${config.darkMode ? '#0f172a' : '#f8fafc'}; border: 1px solid ${borderCol}; border-radius: 10px; margin-bottom: 8px; }
    .pkg-name { font-size: 14px; font-weight: 600; color: ${textColor}; }
    .pkg-desc { font-size: 11px; color: ${mutedColor}; }
    .pkg-price { font-size: 14px; font-weight: 700; color: ${primaryColor}; }

    .btn-wa { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 11px; background: #25d366; color: white; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 600; margin-top: 10px; box-shadow: 0 4px 6px -1px rgba(37,211,102,0.25); }

    .footer { text-align: center; padding: 14px 20px; font-size: 11px; color: ${mutedColor}; border-top: 1px solid ${borderCol}; background: ${config.darkMode ? '#131b2e' : '#f8fafc'}; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      ${config.logoUrl ? `<img src="${config.logoUrl}" alt="Logo" class="logo">` : ''}
      <h1 class="brand-title">${config.brandName || 'Hotspot Login'}</h1>
      <p class="brand-subtitle">${config.subtitle || 'Silakan masukkan kode voucher untuk akses internet'}</p>
    </div>

    ${config.announcement ? `<div class="notice">📢 ${config.announcement}</div>` : ''}

    $(if error)
    <div class="error-box">
      ⚠️ $(error)
    </div>
    $(endif)

    <div class="content">
      <div class="tabs">
        <button type="button" class="tab-btn active" id="tab-voucher" onclick="setMode('voucher')">Kode Voucher</button>
        <button type="button" class="tab-btn" id="tab-member" onclick="setMode('member')">Member / User</button>
      </div>

      <form name="sendin" action="$(link-login-only)" method="post">
        <input type="hidden" name="username" />
        <input type="hidden" name="password" />
        <input type="hidden" name="dst" value="$(link-orig)" />
        <input type="hidden" name="popup" value="true" />
      </form>

      <form name="login" action="$(link-login-only)" method="post" onsubmit="return doLogin()">
        <input type="hidden" name="dst" value="$(link-orig)" />
        <input type="hidden" name="popup" value="true" />

        <div class="form-group">
          <label class="form-label" id="label-user">Kode Voucher</label>
          <input type="text" name="username" class="form-input" placeholder="Masukkan kode voucher..." required autocomplete="off" autocorrect="off" autocapitalize="none">
        </div>

        <div class="form-group" id="group-pass" style="display: none;">
          <label class="form-label">Password</label>
          <input type="password" name="password" class="form-input" placeholder="Masukkan password...">
        </div>

        <button type="submit" class="btn-submit">LOGIN SEKARANG</button>
      </form>

      ${config.allowTrial ? `
      <div class="trial-box">
        $(if trial == 'yes')
        <a href="$(link-login-only)?dst=$(link-orig-esc)&amp;username=T-$(mac-esc)" class="trial-link">✨ Coba Gratis (Trial)</a>
        $(endif)
      </div>` : ''}

      ${(config.packages && config.packages.length > 0) ? `
      <div class="section-title">
        <span>Daftar Harga Paket</span>
      </div>
      ${voucherListHtml}
      ` : ''}

      ${config.waNumber ? `
      <a href="${waUrl}" target="_blank" class="btn-wa">
        💬 Beli Voucher via WhatsApp
      </a>` : ''}
    </div>

    <div class="footer">
      ${config.footerText || `© ${new Date().getFullYear()} ${config.brandName || 'Hotspot Service'}`}
    </div>
  </div>

  <script>
    var currentMode = 'voucher';

    function setMode(mode) {
      currentMode = mode;
      var tabV = document.getElementById('tab-voucher');
      var tabM = document.getElementById('tab-member');
      var groupPass = document.getElementById('group-pass');
      var labelUser = document.getElementById('label-user');

      if (mode === 'voucher') {
        tabV.className = 'tab-btn active';
        tabM.className = 'tab-btn';
        groupPass.style.display = 'none';
        labelUser.innerText = 'Kode Voucher';
        document.login.username.placeholder = 'Masukkan kode voucher...';
      } else {
        tabM.className = 'tab-btn active';
        tabV.className = 'tab-btn';
        groupPass.style.display = 'block';
        labelUser.innerText = 'Username';
        document.login.username.placeholder = 'Masukkan username...';
      }
    }

    function doLogin() {
      var user = document.login.username.value;
      var pass = currentMode === 'voucher' ? user : document.login.password.value;

      $(if chap-id)
      document.sendin.username.value = user;
      document.sendin.password.value = hexMD5('$(chap-id)' + pass + '$(chap-challenge)');
      document.sendin.submit();
      return false;
      $(endif)

      document.login.username.value = user;
      document.login.password.value = pass;
      return true;
    }
  </script>
</body>
</html>`;

  // STATUS.HTML
  const statusHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Status Koneksi - ${config.brandName || 'Hotspot'}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { ${bodyBgStyle} color: ${textColor}; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 16px; }
    .container { width: 100%; max-width: 400px; background: ${cardBg}; border-radius: 20px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.35); border: 1px solid ${borderCol}; overflow: hidden; padding: 24px; text-align: center; backdrop-filter: blur(${cardBlur}px); -webkit-backdrop-filter: blur(${cardBlur}px); }
    .badge-status { display: inline-block; padding: 6px 14px; background: #dcfce7; color: #15803d; border-radius: 999px; font-size: 13px; font-weight: 700; margin-bottom: 16px; }
    .welcome-title { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
    .ip-info { font-size: 12px; color: ${mutedColor}; margin-bottom: 20px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; text-align: left; }
    .info-table td { padding: 10px 12px; border-bottom: 1px solid ${borderCol}; }
    .info-table td:first-child { color: ${mutedColor}; }
    .info-table td:last-child { font-weight: 600; text-align: right; }
    .btn-logout { display: block; width: 100%; padding: 12px; background: #ef4444; color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge-status">● Terhubung ke Internet</div>
    <h2 class="welcome-title">Halo, $(username)!</h2>
    <p class="ip-info">IP Anda: $(ip) | MAC: $(mac)</p>

    <table class="info-table">
      <tr><td>Waktu Terhubung</td><td>$(uptime)</td></tr>
      $(if session-time-left)<tr><td>Sisa Waktu</td><td>$(session-time-left)</td></tr>$(endif)
      <tr><td>Kuota Terpakai</td><td>$(bytes-total-nice)</td></tr>
      $(if remain-bytes-total)<tr><td>Sisa Kuota</td><td>$(remain-bytes-total-nice)</td></tr>$(endif)
    </table>

    <form action="$(link-logout)" name="logout" onSubmit="return openLogout()">
      <button type="submit" class="btn-logout">LOGOUT / KELUAR</button>
    </form>
  </div>
</body>
</html>`;

  // ALOGIN.HTML
  const aloginHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="2; url=$(link-redirect)">
  <title>Login Berhasil</title>
  <style>
    body { background: ${bgColor}; color: ${textColor}; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; text-align: center; }
  </style>
</head>
<body>
  <div>
    <h2>Login Berhasil!</h2>
    <p style="color: ${mutedColor}; margin-top: 8px;">Mengarahkan ke internet...</p>
  </div>
</body>
</html>`;

  // LOGOUT.HTML
  const logoutHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Logout</title>
  <style>
    body { ${bodyBgStyle} color: ${textColor}; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; text-align: center; padding: 20px; }
    .box { background: ${cardBg}; padding: 24px; border-radius: 16px; border: 1px solid ${borderCol}; max-width: 360px; width: 100%; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.35); backdrop-filter: blur(${cardBlur}px); -webkit-backdrop-filter: blur(${cardBlur}px); }
    .btn { display: inline-block; padding: 10px 20px; background: ${primaryColor}; color: white; border-radius: 8px; text-decoration: none; margin-top: 16px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="box">
    <h3>Anda telah Logout</h3>
    <p style="color: ${mutedColor}; font-size: 13px; margin-top: 8px;">Terima kasih telah menggunakan layanan WiFi kami.</p>
    <a href="$(link-login)" class="btn">Login Kembali</a>
  </div>
</body>
</html>`;

  return {
    'login.html': loginHtml,
    'status.html': statusHtml,
    'alogin.html': aloginHtml,
    'logout.html': logoutHtml,
    'md5.js': md5Js
  };
}
