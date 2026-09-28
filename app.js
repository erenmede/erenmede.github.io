(function(){
'use strict';
var DICT = {
  tr: {
    'meta.title':'Eren — Erişilebilirlik Portfolyosu',
    'skip':'İçeriğe geç',
    'toolbar.contrastGroup':'Kontrast','toolbar.sizeGroup':'Yazı boyutu',
    'toolbar.contrastNormal':'Standart','toolbar.contrastHigh':'Yüksek kontrast',
    'h1':'Eren — erişilebilirlik değerlendirmesi ve doküman düzeltmesi',
    'role':'Yirmi yıllık eğitimcilikten WCAG ve PDF/UA uzmanlığına geçiş sürecimden örnekler.',
    'nav.about':'Hakkımda','nav.projects':'Örnek çalışmalar','nav.contact':'İletişim',
    'about.h':'Hakkımda',
    'about.p1':'Devlet okulunda yirmi yıldır İngilizce öğretmenliği ve müdür yardımcılığı yapıyorum. IAAP’ın CPACC sertifikası üzerinden erişilebilirlik alanına geçiş yapıyor, WCAG ve PDF/UA standartlarında eğitim materyallerinin uzaktan erişilebilirlik değerlendirmesi ve düzeltmesi üzerine uzmanlaşıyorum.',
    'about.note':'Not: Bu paragrafı kendi cümlelerinle güncelle — burası yalnızca taslak.',
    'proj.h':'Örnek çalışmalar',
    'proj.p':'Her kayıt, gerçek bir kaynak dokümanın öncesi/sonrası karşılaştırmasını ve kullanılan denetim aracının raporunu içerir.',
    'proj.status.pending':'Hazırlanıyor','proj.status.live':'Bu site',
    'proj.pdf.h':'PDF erişilebilirliği','proj.pdf.p':'Taglama, okuma sırası ve alternatif metin düzeltmesi. Araç: Acrobat Pro, PAC 2024.',
    'proj.word.h':'Word belgesi','proj.word.p':'Başlık stilleri, alternatif metin ve bağlantı metni düzeltmesi. Araç: Word Erişilebilirlik Denetleyicisi.',
    'proj.excel.h':'Excel tablosu','proj.excel.p':'Tablo başlıkları, sayfa adlandırma ve renk-bağımsız durum gösterimi. Araç: Excel Erişilebilirlik Denetleyicisi.',
    'proj.id.h':'InDesign yayını','proj.id.p':'Okuma sırası, nesne alternatif metni ve taglanmış PDF dışa aktarımı. Araç: InDesign 21.5, PAC.',
    'proj.web.h':'Web sayfası','proj.web.p':'Bu sayfanın kendisi: dil seçeneği, kontrast kontrolü, yazı boyutu ve taşma olmadan yeniden düzenlenme (WCAG 1.4.10 Reflow). Araç: axe, WAVE, klavye testi.',
    'link.before':'Önce','link.after':'Sonra',
    'contact.h':'İletişim','contact.p':'E-posta:','contact.note':'Bu adresi ve varsa LinkedIn bağlantını kendi bilgilerinle değiştir.',
    'footer.p1':'Gövde yazı tipi','footer.p2':'az gören okuyucular için Braille Institute tarafından tasarlandı.'
  },
  en: {
    'meta.title':'Eren — Accessibility Portfolio',
    'skip':'Skip to content',
    'toolbar.contrastGroup':'Contrast','toolbar.sizeGroup':'Text size',
    'toolbar.contrastNormal':'Standard','toolbar.contrastHigh':'High contrast',
    'h1':'Eren — accessibility evaluation and document remediation',
    'role':'Examples from my transition out of twenty years in education into WCAG and PDF/UA specialism.',
    'nav.about':'About','nav.projects':'Sample work','nav.contact':'Contact',
    'about.h':'About',
    'about.p1':'I’ve spent twenty years as an English teacher and vice principal at a Turkish state school. I’m moving into accessibility through IAAP’s CPACC certification, specialising in remote WCAG and PDF/UA evaluation and remediation of educational materials.',
    'about.note':'Note: rewrite this paragraph in your own words — it’s a placeholder for now.',
    'proj.h':'Sample work',
    'proj.p':'Each entry pairs a before/after comparison of a real source document with the report from the tool used to check it.',
    'proj.status.pending':'In progress','proj.status.live':'This site',
    'proj.pdf.h':'PDF accessibility','proj.pdf.p':'Tagging, reading order, and alt text fixes. Tools: Acrobat Pro, PAC 2024.',
    'proj.word.h':'Word document','proj.word.p':'Heading styles, alt text, and link text fixes. Tool: Word Accessibility Checker.',
    'proj.excel.h':'Excel spreadsheet','proj.excel.p':'Table headers, sheet naming, and color-independent status. Tool: Excel Accessibility Checker.',
    'proj.id.h':'InDesign publication','proj.id.p':'Reading order, object alt text, tagged PDF export. Tools: InDesign 21.5, PAC.',
    'proj.web.h':'Web page','proj.web.p':'This page itself: a language switch, contrast control, text-size control, and reflow with no scrolling required (WCAG 1.4.10). Tools: axe, WAVE, keyboard testing.',
    'link.before':'Before','link.after':'After',
    'contact.h':'Contact','contact.p':'Email:','contact.note':'Replace this address, and a LinkedIn link if you have one, with your own.',
    'footer.p1':'Body text is set in','footer.p2':'designed by the Braille Institute for readers with low vision.'
  }
};

var root = document.documentElement;

function applyLang(lang){
  var d = DICT[lang] || DICT.tr;
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var key = el.getAttribute('data-i18n');
    if (d[key]) el.textContent = d[key];
  });
  document.querySelectorAll('[data-i18n-label]').forEach(function(el){
    var key = el.getAttribute('data-i18n-label');
    if (d[key]) el.setAttribute('aria-label', d[key]);
  });
  document.querySelectorAll('[data-lang]').forEach(function(b){
    b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
  });
  root.lang = lang;
  try { localStorage.setItem('lang', lang); } catch (e) {}
}

function applyContrast(mode){
  if (mode === 'high') root.setAttribute('data-contrast', 'high');
  else root.removeAttribute('data-contrast');
  document.querySelectorAll('[data-contrast]').forEach(function(b){
    b.setAttribute('aria-pressed', b.getAttribute('data-contrast') === mode ? 'true' : 'false');
  });
  try { localStorage.setItem('contrast', mode); } catch (e) {}
}

function applyScale(pct){
  root.style.fontSize = pct + '%';
  document.querySelectorAll('.tsize').forEach(function(b){
    b.setAttribute('aria-pressed', b.getAttribute('data-scale') === String(pct) ? 'true' : 'false');
  });
  try { localStorage.setItem('scale', pct); } catch (e) {}
}

document.addEventListener('click', function(e){
  var b = e.target.closest('button');
  if (!b) return;
  if (b.dataset.lang) applyLang(b.dataset.lang);
  else if (b.dataset.contrast) applyContrast(b.dataset.contrast);
  else if (b.dataset.scale) applyScale(b.dataset.scale);
});

var savedLang = 'tr', savedContrast = 'normal', savedScale = '100';
try {
  savedLang = localStorage.getItem('lang') || savedLang;
  savedContrast = localStorage.getItem('contrast') || savedContrast;
  savedScale = localStorage.getItem('scale') || savedScale;
} catch (e) {}
applyLang(savedLang);
applyContrast(savedContrast);
applyScale(savedScale);
})();
