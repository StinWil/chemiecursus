import { useState, useEffect } from "react";

// ── PALETTE (paper · ink · sepia) ────────────────────────────────────────────
const P = {
  paper:'#f6f0e4',
  paperDark:'#ede2c8',
  paperLight:'#fbf6ec',
  ink:'#1a1208',
  sepia:'#7a1a1a',
  sepiaSoft:'#a04545',
  faded:'#5c4a3a',
  margin:'#8b7355',
  rule:'#3a2a18',
  ok:'#2d5016',
  okBg:'#e8e4cc',
  err:'#7a1a1a',
  errBg:'#efd9c8',
};

const FONT_S = "'Georgia','Times New Roman',serif";
const FONT_M = "'Courier New','Courier',monospace";

// ── SECTION DATA ──────────────────────────────────────────────────────────────
const SEC = {
H3:[
{id:'3.1',t:'Theorie van Arrhenius',sub:'Zuur · base · waterig milieu',c1:true,
th:[
'Zuur (Arrhenius): stof die in water H<sup>+</sup> of H<sub>3</sub>O<sup>+</sup> afgeeft. Bv. HCl → H<sup>+</sup> + Cl<sup>−</sup>',
'Base (Arrhenius): stof die in water OH<sup>−</sup> vrijstelt. Bv. NaOH → Na<sup>+</sup> + OH<sup>−</sup>',
'<b>Sterke</b> zuren ioniseren <b>volledig</b> (→); zwakke zuren <b>gedeeltelijk</b> (⇌)',
'<b>Beperking:</b> geldt enkel in waterig milieu; NH<sub>3</sub> past niet (geen OH<sup>−</sup>-groep)',
'Tweewaardige zuren (bv. H<sub>2</sub>SO<sub>4</sub>) geven 2 H<sup>+</sup> af in twee stappen — elke volgende stap moeilijker',
],
fm:'HZ → H<sup>+</sup> + Z<sup>−</sup>&nbsp;&nbsp;&nbsp;(sterk zuur)\nBase → Me<sup>+</sup> + OH<sup>−</sup>&nbsp;&nbsp;(sterke base)',
exo:[
{s:1,q:'Een schoonmaker lost 7,30 g HCl (M=36,5 g/mol) op tot 100 mL ontkalker. (a) Schrijf de ionisatie volgens Arrhenius. (b) Bereken [H<sup>+</sup>]. (c) Welk volume van deze oplossing is nodig om 8,0 g CaCO<sub>3</sub> (M=100) volledig te ontkalken via CaCO<sub>3</sub> + 2HCl → CaCl<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>?',
a:'(a) HCl → H<sup>+</sup> + Cl<sup>−</sup> (sterk zuur, →)<br>(b) n=7,30/36,5=0,200 mol → c=2,00 mol/L → [H<sup>+</sup>]=2,00 mol/L<br>(c) n(CaCO<sub>3</sub>)=0,080 mol → n(HCl)=0,160 mol → V=0,160/2,00=0,080 L = <b>80 mL</b>'},
{s:1,q:'Een chemiestudent bereidt natronloog door 4,00 g NaOH (M=40 g/mol) op te lossen tot 250 mL. (a) Geef de dissociatievergelijking volgens Arrhenius. (b) Bereken [OH<sup>−</sup>]. (c) Welk volume 1,00 M HCl is nodig om de volledige oplossing te neutraliseren?',
a:'(a) NaOH → Na<sup>+</sup> + OH<sup>−</sup> (sterke base, dissociatie)<br>(b) n=4,00/40=0,100 mol → c=0,400 M → [OH<sup>−</sup>]=0,400 mol/L<br>(c) n(NaOH)=0,100 mol → n(HCl)=0,100 mol → V=0,100/1,00 = <b>100 mL</b>'},
{s:1,q:'Acculaadzuur is 35,0 m% H<sub>2</sub>SO<sub>4</sub> (ρ=1,26 g/mL, M=98). (a) Bereken de molaire concentratie. (b) Schrijf beide ionisatiestappen volgens Arrhenius (sterke + zwakkere stap). (c) Bereken [H<sup>+</sup>] indien beide stappen volledig zouden ioniseren.',
a:'(a) c = ρ·m%·10/M = 1,26·35,0·10/98 = <b>4,50 M</b><br>(b) Stap 1: H<sub>2</sub>SO<sub>4</sub> → H<sup>+</sup> + HSO<sub>4</sub><sup>−</sup> (sterk)<br>&nbsp;&nbsp;&nbsp;&nbsp;Stap 2: HSO<sub>4</sub><sup>−</sup> ⇌ H<sup>+</sup> + SO<sub>4</sub><sup>2−</sup> (zwakker)<br>(c) Volledig: [H<sup>+</sup>] = 2·c = <b>9,00 M</b>'},
{s:1,q:'Om een waterkoker te ontkalken gebruik je 100 mL azijnzuur 1,0 M (CH<sub>3</sub>COOH, K<sub>z</sub>=1,74×10<sup>−5</sup>). (a) Geef de ionisatie met de juiste pijl. (b) Verklaar waarom je véél meer azijnzuur nodig hebt vergeleken met een zelfde [H<sup>+</sup>] uit HCl. (c) Welke massa CaCO<sub>3</sub> (M=100) kan théoretisch verwijderd worden bij volledige neutralisatie (2 mol zuur per mol CaCO<sub>3</sub>)?',
a:'(a) CH<sub>3</sub>COOH ⇌ H<sup>+</sup> + CH<sub>3</sub>COO<sup>−</sup> (evenwicht, zwak)<br>(b) Zwak zuur ioniseert slechts gedeeltelijk (α ≈ 0,4%) — slechts een klein deel van de moleculen levert H<sup>+</sup>. Bij HCl ioniseert 100%.<br>(c) n(CH<sub>3</sub>COOH)=0,100 mol → n(CaCO<sub>3</sub>)=0,050 mol → m = <b>5,0 g CaCO<sub>3</sub></b>'},
{s:2,q:'In een aquarium met goudvissen (pH 6,5–7,5) gebruikt de eigenaar NH<sub>3</sub>-oplossing om de pH licht te verhogen. (a) Schrijf de protolyse van NH<sub>3</sub> in water — verklaar het basisch karakter ondanks de afwezigheid van een OH-groep. (b) Welke beperking van Arrhenius wordt zichtbaar? (c) Hoeveel mol NH<sub>3</sub> is nodig om in 50,0 L water [OH<sup>−</sup>] van 1,0×10<sup>−7</sup> tot 1,0×10<sup>−5</sup> mol/L te brengen (aanname: volledige reactie)?',
a:'(a) NH<sub>3</sub> + H<sub>2</sub>O ⇌ NH<sub>4</sub><sup>+</sup> + OH<sup>−</sup> — NH<sub>3</sub> neemt indirect een proton op van water, daardoor ontstaat OH<sup>−</sup>.<br>(b) Arrhenius vereist een directe afgifte van OH<sup>−</sup> uit de stof zelf — NH<sub>3</sub> bezit geen OH-groep. Brønsted lost dit op.<br>(c) Δ[OH<sup>−</sup>] ≈ 10<sup>−5</sup> mol/L → n = c·V = 10<sup>−5</sup>·50 = <b>5,0×10<sup>−4</sup> mol NH<sub>3</sub></b>'},
{s:2,q:'In een industrieel zwavelzuurproductieproces wordt 98 m% H<sub>2</sub>SO<sub>4</sub> verdund tot 10 m%. (a) Verklaar waarom verdund zwavelzuur veel reactiever is met Zn dan geconcentreerd. (b) Wat gebeurt er met het evenwicht van de tweede ionisatiestap bij verdunning (Le Chatelier)? (c) Bij dezelfde n(H<sup>+</sup>): welke vorm geeft een grotere ionconcentratie?',
a:'(a) In 98%-oplossing zijn er nauwelijks H<sub>2</sub>O-moleculen — H<sub>2</sub>SO<sub>4</sub> blijft grotendeels moleculair. Bij verdunning ioniseert stap 1 volledig en stap 2 gedeeltelijk → veel meer H<sup>+</sup> beschikbaar voor reactie met Zn.<br>(b) Verdunning verschuift het evenwicht HSO<sub>4</sub><sup>−</sup> ⇌ H<sup>+</sup> + SO<sub>4</sub><sup>2−</sup> naar rechts (meer deeltjes) → grotere ionisatiegraad.<br>(c) Verdunde oplossing — meer mol H<sub>2</sub>O én meer ionisatie → effectief meer reactieve H<sup>+</sup>-deeltjes per mol H<sub>2</sub>SO<sub>4</sub>.'},
{s:3,q:'Cola bevat fosforzuur H<sub>3</sub>PO<sub>4</sub> (E338) met pK<sub>z1</sub>=2,15, pK<sub>z2</sub>=7,20, pK<sub>z3</sub>=12,35. (a) Schrijf de drie opeenvolgende ionisatiestappen. (b) Verklaar de trend in K<sub>z</sub> via elektrostatische argumenten. (c) Welke fosfaatsoort domineert bij bloed-pH 7,40? Toon de verhouding [HPO<sub>4</sub><sup>2−</sup>]/[H<sub>2</sub>PO<sub>4</sub><sup>−</sup>].',
a:'(a) H<sub>3</sub>PO<sub>4</sub> ⇌ H<sup>+</sup> + H<sub>2</sub>PO<sub>4</sub><sup>−</sup> · H<sub>2</sub>PO<sub>4</sub><sup>−</sup> ⇌ H<sup>+</sup> + HPO<sub>4</sub><sup>2−</sup> · HPO<sub>4</sub><sup>2−</sup> ⇌ H<sup>+</sup> + PO<sub>4</sub><sup>3−</sup><br>(b) Elke ionisatiestap vertrekt van een steeds negatiever deeltje dat het volgend proton sterker elektrostatisch vasthoudt → grotere arbeid om H<sup>+</sup> los te trekken → K<sub>z</sub> krimpt elke stap ca. 10<sup>5</sup>×.<br>(c) Bij pH=7,40: log([HPO<sub>4</sub><sup>2−</sup>]/[H<sub>2</sub>PO<sub>4</sub><sup>−</sup>]) = pH − pK<sub>z2</sub> = 7,40 − 7,20 = 0,20 → r = 10<sup>0,20</sup> = <b>1,58</b> — HPO<sub>4</sub><sup>2−</sup> licht in overmaat; beide soorten ongeveer evenveel aanwezig.'},
]},

{id:'3.2',t:'Brønsted-Lowry',sub:'Protondonor · acceptor · geconjugeerde paren · amfoter',c1:true,
th:[
'Brønsted-zuur = <b>protondonor</b>: geeft H<sup>+</sup> af',
'Brønsted-base = <b>protonacceptor</b>: neemt H<sup>+</sup> op',
'Geconjugeerd paar: zuur en zijn conjugaatbase verschillen slechts met 1 proton',
'<b>Amfoter:</b> kan zowel proton afstaan als opnemen — bv. H<sub>2</sub>O, HCO<sub>3</sub><sup>−</sup>, H<sub>2</sub>PO<sub>4</sub><sup>−</sup>',
'Reactie verloopt van sterkere kant naar zwakkere kant — evenwicht ligt bij de zwakste kant',
],
fm:'Zuur ⇌ H<sup>+</sup> + geconjugeerde base\nBase + H<sup>+</sup> ⇌ geconjugeerd zuur',
exo:[
{s:1,q:'Een patiënt met maagontstoking neemt 1,68 g NaHCO<sub>3</sub> (M=84) opgelost in een glas water. In de maag reageert het met HCl (gemiddelde maagzuur-c = 0,15 M). (a) Schrijf de protolysereactie. (b) Identificeer beide geconjugeerde paren. (c) Welk volume maagzuur wordt geneutraliseerd?',
a:'(a) HCO<sub>3</sub><sup>−</sup> + H<sup>+</sup> ⇌ H<sub>2</sub>CO<sub>3</sub> → H<sub>2</sub>O + CO<sub>2</sub>↑<br>(b) Paar 1: HCl/Cl<sup>−</sup> (zuur/geconj.base) · Paar 2: HCO<sub>3</sub><sup>−</sup>/H<sub>2</sub>CO<sub>3</sub> (base/geconj.zuur)<br>(c) n(NaHCO<sub>3</sub>) = 1,68/84 = 0,020 mol = n(HCl) → V = 0,020/0,15 = <b>0,133 L = 133 mL</b>'},
{s:1,q:'In een chemisch labo lost een leerling 5,35 g NH<sub>4</sub>Cl (M=53,5) op in 200 mL water. (a) Schrijf de protolyse van NH<sub>4</sub><sup>+</sup> met water. (b) Identificeer beide geconjugeerde paren. (c) Verklaar waarom dit zout een zure oplossing geeft ondanks dat NH<sub>4</sub>Cl op zich neutraal lijkt.',
a:'(a) NH<sub>4</sub><sup>+</sup> + H<sub>2</sub>O ⇌ NH<sub>3</sub> + H<sub>3</sub>O<sup>+</sup><br>(b) Paar 1: NH<sub>4</sub><sup>+</sup>/NH<sub>3</sub> · Paar 2: H<sub>2</sub>O/H<sub>3</sub>O<sup>+</sup><br>(c) NH<sub>4</sub><sup>+</sup> is de geconjugeerde zuur van zwakke base NH<sub>3</sub> (K<sub>b</sub>=1,8×10<sup>−5</sup>) → NH<sub>4</sub><sup>+</sup> heeft K<sub>z</sub> = 10<sup>−14</sup>/1,8×10<sup>−5</sup> = 5,6×10<sup>−10</sup>. Dit is klein, maar groot genoeg om H<sub>3</sub>O<sup>+</sup> te vormen → <b>pH < 7</b>.'},
{s:1,q:'Bij koolzuur-houdend mineraalwater reageert opgelost CO<sub>2</sub> met water. (a) Schrijf de eerste protolysereactie. (b) Identificeer rol van H<sub>2</sub>O. (c) Schrijf de tweede protolysestap (van HCO<sub>3</sub><sup>−</sup>) en bepaal welk amfolyt hier ontstaat.',
a:'(a) CO<sub>2</sub> + 2H<sub>2</sub>O ⇌ H<sub>3</sub>O<sup>+</sup> + HCO<sub>3</sub><sup>−</sup><br>(b) H<sub>2</sub>O = base (neemt H<sup>+</sup> op uit CO<sub>2</sub>/H<sub>2</sub>CO<sub>3</sub>)<br>(c) HCO<sub>3</sub><sup>−</sup> + H<sub>2</sub>O ⇌ CO<sub>3</sub><sup>2−</sup> + H<sub>3</sub>O<sup>+</sup>. Het amfolyt is <b>HCO<sub>3</sub><sup>−</sup></b> — kan H<sup>+</sup> opnemen (→H<sub>2</sub>CO<sub>3</sub>) of afgeven (→CO<sub>3</sub><sup>2−</sup>).'},
{s:1,q:'In de winkel staat NaOCl-bleekwater met etiket "niet mengen met zuren". Een onvoorzichtige consument giet er 10 mL keukenazijn (CH<sub>3</sub>COOH 1,0 M) bij. (a) Schrijf de protolyse-reactie van OCl<sup>−</sup> + CH<sub>3</sub>COOH. (b) Identificeer geconjugeerde paren. (c) Berekenen hoeveel mol HOCl (toxisch, kan Cl<sub>2</sub> vrijmaken) er ontstaat als alle azijnzuur reageert.',
a:'(a) OCl<sup>−</sup> + CH<sub>3</sub>COOH ⇌ HOCl + CH<sub>3</sub>COO<sup>−</sup><br>(b) Paar 1: CH<sub>3</sub>COOH/CH<sub>3</sub>COO<sup>−</sup> · Paar 2: HOCl/OCl<sup>−</sup><br>(c) n(CH<sub>3</sub>COOH) = 1,0·0,010 = 0,010 mol → n(HOCl) = <b>0,010 mol</b> — bij voldoende OCl<sup>−</sup> wordt alle azijnzuur omgezet (K-waarde > 10<sup>3</sup>: aflopend).'},
{s:2,q:'In de productie van NH<sub>4</sub>Cl-meststoffen reageert NH<sub>3</sub>-gas met HCl-gas zonder oplosmiddel. (a) Schrijf de protolyse. (b) Verklaar waarom Arrhenius hier faalt maar Brønsted niet. (c) Bereken welke massa NH<sub>4</sub>Cl ontstaat als 1,70 kg NH<sub>3</sub> (M=17) volledig reageert.',
a:'(a) NH<sub>3</sub> + HCl → NH<sub>4</sub>Cl (proton transfer in gasfase)<br>(b) Arrhenius vereist een waterig milieu — er is geen water aanwezig. Brønsted: protontransfer tussen donor (HCl) en acceptor (NH<sub>3</sub>) — geldt overal.<br>(c) n(NH<sub>3</sub>) = 1700/17 = 100 mol → n(NH<sub>4</sub>Cl) = 100 mol → m = 100·53,5 = <b>5350 g = 5,35 kg</b>'},
{s:2,q:'Een biochemicus bestudeert HPO<sub>4</sub><sup>2−</sup> als amfolyt in een fysiologische buffer. Gebruik pK<sub>z2</sub>=7,20 en pK<sub>z3</sub>=12,35. (a) Schrijf de reactie waar HPO<sub>4</sub><sup>2−</sup> als zuur reageert met OH<sup>−</sup>. (b) Schrijf de reactie waar het als base reageert met H<sub>3</sub>O<sup>+</sup>. (c) Bij welke pH-grens overheerst telkens een van de gedragingen?',
a:'(a) Als zuur: HPO<sub>4</sub><sup>2−</sup> + OH<sup>−</sup> → PO<sub>4</sub><sup>3−</sup> + H<sub>2</sub>O<br>(b) Als base: HPO<sub>4</sub><sup>2−</sup> + H<sub>3</sub>O<sup>+</sup> → H<sub>2</sub>PO<sub>4</sub><sup>−</sup> + H<sub>2</sub>O<br>(c) Bij pH < 7,20: HPO<sub>4</sub><sup>2−</sup> gedraagt zich overwegend als <b>base</b> (neemt H<sup>+</sup> op). Bij pH > 12,35: gedraagt zich als <b>zuur</b> (geeft H<sup>+</sup> af). Tussen pK<sub>z2</sub> en pK<sub>z3</sub> is HPO<sub>4</sub><sup>2−</sup> de stabiele overheersende vorm.'},
{s:3,q:'In zee-water (pH≈8,1, oceaan-verzuring) is HCO<sub>3</sub><sup>−</sup>/CO<sub>3</sub><sup>2−</sup>-evenwicht cruciaal voor koralen die CaCO<sub>3</sub>-skeletten vormen. pK<sub>z1</sub>(H<sub>2</sub>CO<sub>3</sub>)=6,35; pK<sub>z2</sub>(HCO<sub>3</sub><sup>−</sup>)=10,33. (a) Welk amfolyt is dominant bij pH 8,1? Toon kwantitatief. (b) Bij pH-daling naar 7,8 (zure regen-impact): hoeveel keer minder CO<sub>3</sub><sup>2−</sup> is beschikbaar? (c) Verklaar het gevolg voor koralenformatie.',
a:'(a) Bij pH=8,1: log([HCO<sub>3</sub><sup>−</sup>]/[H<sub>2</sub>CO<sub>3</sub>])=8,1−6,35=1,75 → r=56 · log([CO<sub>3</sub><sup>2−</sup>]/[HCO<sub>3</sub><sup>−</sup>])=8,1−10,33=−2,23 → r=5,9×10<sup>−3</sup>. <b>HCO<sub>3</sub><sup>−</sup> dominant</b>.<br>(b) Bij pH=7,8: log([CO<sub>3</sub><sup>2−</sup>]/[HCO<sub>3</sub><sup>−</sup>])=−2,53 → r=2,95×10<sup>−3</sup>. Verhouding 5,9/2,95 = <b>2,0× minder CO<sub>3</sub><sup>2−</sup></b>.<br>(c) Ca<sup>2+</sup>+CO<sub>3</sub><sup>2−</sup>→CaCO<sub>3</sub>(s) wordt thermodynamisch ongunstiger; skeletten vormen trager én bestaande structuren lossen op.'},
]},

{id:'3.3',t:'Sterkte van zuren en basen',sub:'Kz · Kb · pKz · sterke/zwakke zuren',c1:true,
th:[
'Sterke zuren ioniseren volledig: HCl, HBr, HI, HNO<sub>3</sub>, H<sub>2</sub>SO<sub>4</sub>, HClO<sub>4</sub>',
'Zwakke zuren: K<sub>z</sub> = [H<sub>3</sub>O<sup>+</sup>][Z<sup>−</sup>] / [HZ] &nbsp;→ grotere K<sub>z</sub> = sterker zuur',
'pK<sub>z</sub> = −log(K<sub>z</sub>) &nbsp;→ kleinere pK<sub>z</sub> = sterker zuur',
'K<sub>z</sub> × K<sub>b</sub> = K<sub>w</sub> = 10<sup>−14</sup> voor elk geconjugeerd paar (25°C)',
'<b>Tip:</b> sterk zuur → zwakke geconjugeerde base en omgekeerd',
],
fm:'K<sub>z</sub> = [H<sub>3</sub>O<sup>+</sup>][Z<sup>−</sup>] / [HZ]\nK<sub>b</sub> = [BH<sup>+</sup>][OH<sup>−</sup>] / [B]\nK<sub>z</sub> · K<sub>b</sub> = K<sub>w</sub> = 10<sup>−14</sup>\npK<sub>z</sub> = −log(K<sub>z</sub>)',
exo:[
{s:1,q:'Een leerling vergelijkt drie zuren met dezelfde concentratie 0,10 M: HCl, HCOOH (K<sub>z</sub>=1,77×10<sup>−4</sup>) en CH<sub>3</sub>COOH (K<sub>z</sub>=1,74×10<sup>−5</sup>). (a) Rangschik volgens zuursterkte. (b) Bereken pK<sub>z</sub> van HCOOH en CH<sub>3</sub>COOH. (c) Bereken K<sub>b</sub> van mierenzuration HCOO<sup>−</sup>.',
a:'(a) HCl > HCOOH > CH<sub>3</sub>COOH (sterk → grootste K<sub>z</sub> → kleinste K<sub>z</sub>)<br>(b) pK<sub>z</sub>(HCOOH) = −log(1,77×10<sup>−4</sup>) = <b>3,75</b> · pK<sub>z</sub>(CH<sub>3</sub>COOH) = −log(1,74×10<sup>−5</sup>) = <b>4,76</b><br>(c) K<sub>b</sub>(HCOO<sup>−</sup>) = K<sub>w</sub>/K<sub>z</sub> = 10<sup>−14</sup>/1,77×10<sup>−4</sup> = <b>5,65×10<sup>−11</sup></b>'},
{s:1,q:'In een cola-frisdrank bevat het opgeloste H<sub>3</sub>PO<sub>4</sub> met pK<sub>z1</sub>=2,15. (a) Bereken K<sub>z1</sub>. (b) Bereken K<sub>b</sub> voor de geconjugeerde base H<sub>2</sub>PO<sub>4</sub><sup>−</sup>. (c) Is H<sub>2</sub>PO<sub>4</sub><sup>−</sup> een sterke of zwakke base?',
a:'(a) K<sub>z1</sub> = 10<sup>−2,15</sup> = <b>7,08×10<sup>−3</sup></b><br>(b) K<sub>b</sub>(H<sub>2</sub>PO<sub>4</sub><sup>−</sup>) = 10<sup>−14</sup>/7,08×10<sup>−3</sup> = <b>1,41×10<sup>−12</sup></b><br>(c) <b>Zeer zwakke base</b> (K<sub>b</sub> << 1). H<sub>2</sub>PO<sub>4</sub><sup>−</sup> heeft sowieso meer neiging om zelf weer H<sup>+</sup> af te geven (Kz<sub>2</sub>=6,2×10<sup>−8</sup>) dan op te nemen.'},
{s:1,q:'Bleekmiddel bevat NaOCl. HOCl heeft K<sub>z</sub>=2,88×10<sup>−8</sup>. (a) Bereken pK<sub>z</sub>. (b) Bereken K<sub>b</sub>(OCl<sup>−</sup>). (c) Welke fractie OCl<sup>−</sup> in 0,10 M NaOCl is gehydrolyseerd? Bereken [OH<sup>−</sup>] via [OH<sup>−</sup>]=√(K<sub>b</sub>·c).',
a:'(a) pK<sub>z</sub> = −log(2,88×10<sup>−8</sup>) = <b>7,54</b><br>(b) K<sub>b</sub> = 10<sup>−14</sup>/2,88×10<sup>−8</sup> = <b>3,47×10<sup>−7</sup></b><br>(c) [OH<sup>−</sup>] = √(3,47×10<sup>−7</sup>·0,10) = √(3,47×10<sup>−8</sup>) = 1,86×10<sup>−4</sup> M → % hydrolyse = 1,86×10<sup>−4</sup>/0,10·100% = <b>0,19%</b>'},
{s:1,q:'In een biochemie-experiment vergelijk je twee zwakke zuren: melkzuur (K<sub>z</sub>=1,4×10<sup>−4</sup>) en boterzuur (K<sub>z</sub>=1,5×10<sup>−5</sup>). (a) Welk heeft de sterkste geconjugeerde base? Verklaar. (b) Bereken pK<sub>z</sub> van beide. (c) Welk geeft bij c=0,01 M een lagere pH?',
a:'(a) <b>Boterzuur</b>: kleinste K<sub>z</sub> = zwakste zuur → sterkste geconjugeerde base (K<sub>b</sub>·K<sub>z</sub>=K<sub>w</sub>).<br>(b) pK<sub>z</sub>(melk) = −log(1,4×10<sup>−4</sup>) = <b>3,85</b> · pK<sub>z</sub>(boter) = −log(1,5×10<sup>−5</sup>) = <b>4,82</b><br>(c) <b>Melkzuur</b> — sterker zuur, meer [H<sup>+</sup>], lagere pH.'},
{s:2,q:'In de zure regen-problematiek vormt SO<sub>2</sub> + H<sub>2</sub>O zwaveligzuur (K<sub>z1</sub>=1,7×10<sup>−2</sup>). Tegelijk is HNO<sub>3</sub> (sterk zuur) aanwezig. (a) Bereken de pH van een 0,0010 M H<sub>2</sub>SO<sub>3</sub>-oplossing. (b) Bereken pH van 0,0010 M HNO<sub>3</sub>. (c) Welk zuur is in praktijk sneller schadelijk voor HCO<sub>3</sub><sup>−</sup>-bufferende bodems?',
a:'(a) Niet-benadering nodig (α groot). Uit K<sub>z</sub> = x²/(0,001−x) = 1,7×10<sup>−2</sup>: x²+0,017x−1,7×10<sup>−5</sup>=0 → x = 9,1×10<sup>−4</sup> M → pH = <b>3,04</b>.<br>(b) HNO<sub>3</sub> sterk: [H<sup>+</sup>]=0,001 → pH = <b>3,00</b>.<br>(c) <b>HNO<sub>3</sub></b> — sterk zuur reageert onmiddellijk en volledig met HCO<sub>3</sub><sup>−</sup>; H<sub>2</sub>SO<sub>3</sub> is in evenwicht en levert H<sup>+</sup> gradueel. HNO<sub>3</sub> belast eerst de buffer.'},
{s:2,q:'In bewaarmiddelen wordt benzoëzuur C<sub>6</sub>H<sub>5</sub>COOH gebruikt (K<sub>z</sub>=6,3×10<sup>−5</sup>, pK<sub>z</sub>=4,20). Het werkt enkel in de moleculaire vorm (HA), niet als zout (A<sup>−</sup>). (a) Bij welke pH is 99% in actieve HA-vorm? (b) Werkt het in zuivelproducten (pH=4,5)? (c) Wat in frisdranken (pH=2,5)?',
a:'(a) [A<sup>−</sup>]/[HA] = 0,01/0,99 → log(r) = pH − pK<sub>z</sub> → pH = 4,20 + log(0,0101) = 4,20 − 2,00 = <b>2,20</b><br>(b) pH=4,5: log(r)=4,5−4,2=0,30 → r=2,0 → 33% HA, 67% A<sup>−</sup>. <b>Beperkt actief</b>.<br>(c) pH=2,5: log(r)=2,5−4,2=−1,70 → r=0,020 → 98% HA. <b>Zeer effectief</b>.'},
{s:3,q:'In een waterbehandeling moet HCN-bevattend afvalwater veilig gemaakt worden (HCN K<sub>z</sub>=6,2×10<sup>−10</sup>; HCN moleculair is toxisch, CN<sup>−</sup> minder). (a) Bereken de pH van 0,010 M HCN. (b) Welke verhouding [CN<sup>−</sup>]/[HCN] is nodig bij pH=10,5? (c) Vergelijk met pH=7: hoeveel keer hoger is de HCN-fractie?',
a:'(a) [H<sup>+</sup>] = √(6,2×10<sup>−10</sup>·0,010) = √(6,2×10<sup>−12</sup>) = 2,49×10<sup>−6</sup> M → pH = <b>5,60</b><br>(b) pK<sub>z</sub>=9,21 → log(r)=10,5−9,21=1,29 → r=<b>19,5</b> (CN<sup>−</sup> in overmaat)<br>(c) Bij pH=10,5: HCN-fractie=1/(1+19,5)=4,9%. Bij pH=7: log(r)=−2,21 → r=6,2×10<sup>−3</sup> → HCN-fractie=99,4%. Ratio = 99,4/4,9 = <b>20× meer HCN bij pH=7</b> — verklaart waarom basisch milieu vereist is bij afvalverwerking.'},
]},

{id:'3.4',t:'Waterevenwicht & pH',sub:'Kw · pH + pOH = 14 · zuur/neutraal/basisch',c1:true,
th:[
'K<sub>w</sub> = [H<sub>3</sub>O<sup>+</sup>][OH<sup>−</sup>] = 1,0×10<sup>−14</sup> mol²/L² bij 25°C',
'pH = −log[H<sub>3</sub>O<sup>+</sup>] &nbsp;&nbsp; pOH = −log[OH<sup>−</sup>] &nbsp;&nbsp; pH + pOH = 14',
'Zuur: pH < 7 &nbsp;·&nbsp; Neutraal: pH = 7 &nbsp;·&nbsp; Basisch: pH > 7 (bij 25°C)',
'Puur water: [H<sub>3</sub>O<sup>+</sup>] = [OH<sup>−</sup>] = 10<sup>−7</sup> mol/L → pH = 7',
'<b>Tip:</b> K<sub>w</sub> verandert met temperatuur! pH 7 is enkel neutraal bij 25°C.',
],
fm:'K<sub>w</sub> = [H<sub>3</sub>O<sup>+</sup>][OH<sup>−</sup>] = 10<sup>−14</sup>\npH = −log[H<sub>3</sub>O<sup>+</sup>]\npOH = −log[OH<sup>−</sup>]\npH + pOH = 14',
exo:[
{s:1,q:'Een waterleverancier meet voor leidingwater pH=7,4. (a) Bereken [H<sub>3</sub>O<sup>+</sup>] en [OH<sup>−</sup>]. (b) Verifieer K<sub>w</sub>. (c) Welke massa NaOH (M=40) zou aan 100 L water toegevoegd moeten worden om de pH op 8,0 te brengen (verwaarloos buffering)?',
a:'(a) [H<sub>3</sub>O<sup>+</sup>] = 10<sup>−7,4</sup> = <b>4,0×10<sup>−8</sup> mol/L</b> · [OH<sup>−</sup>] = 10<sup>−6,6</sup> = <b>2,5×10<sup>−7</sup> mol/L</b><br>(b) K<sub>w</sub> = 4,0×10<sup>−8</sup> × 2,5×10<sup>−7</sup> = 1,0×10<sup>−14</sup> ✓<br>(c) Bij pH=8: [OH<sup>−</sup>] = 10<sup>−6</sup> M. Δ[OH<sup>−</sup>] ≈ 10<sup>−6</sup> → n = 10<sup>−6</sup>·100 = 10<sup>−4</sup> mol → m = 4,0×10<sup>−3</sup> g = <b>4,0 mg NaOH</b>'},
{s:1,q:'In bloed bij lichaamstemperatuur (37°C) is K<sub>w</sub>=2,5×10<sup>−14</sup>. Bij pH=7,40: (a) Bereken [H<sub>3</sub>O<sup>+</sup>] en [OH<sup>−</sup>]. (b) Toon dat pH+pOH ≠ 14. (c) Wat is de "neutrale" pH bij 37°C?',
a:'(a) [H<sub>3</sub>O<sup>+</sup>] = 10<sup>−7,40</sup> = <b>4,0×10<sup>−8</sup> M</b> · [OH<sup>−</sup>] = K<sub>w</sub>/[H<sup>+</sup>] = 2,5×10<sup>−14</sup>/4,0×10<sup>−8</sup> = <b>6,3×10<sup>−7</sup> M</b><br>(b) pOH = −log(6,3×10<sup>−7</sup>) = 6,20 → pH + pOH = <b>13,60</b> ≠ 14<br>(c) Neutraal: [H<sup>+</sup>]=[OH<sup>−</sup>]=√K<sub>w</sub>=√(2,5×10<sup>−14</sup>) = 1,58×10<sup>−7</sup> → pH = <b>6,80</b>'},
{s:1,q:'Een visser meet de pH van een meer als 5,5 (zure regen-impact). (a) Bereken [H<sup>+</sup>]. (b) Hoeveel keer zuurder is dit dan zuiver water? (c) Welke massa CaCO<sub>3</sub> (M=100) is nodig om 1000 L water terug op pH=7 te brengen (CaCO<sub>3</sub>+2H<sup>+</sup>→Ca<sup>2+</sup>+H<sub>2</sub>O+CO<sub>2</sub>)?',
a:'(a) [H<sup>+</sup>] = 10<sup>−5,5</sup> = <b>3,16×10<sup>−6</sup> M</b><br>(b) Factor 3,16×10<sup>−6</sup>/10<sup>−7</sup> = <b>31,6× zuurder</b><br>(c) n(H<sup>+</sup>)≈3,16×10<sup>−6</sup>·1000=3,16×10<sup>−3</sup> mol → n(CaCO<sub>3</sub>)=1,58×10<sup>−3</sup> mol → m = <b>0,158 g</b>'},
{s:1,q:'In een aquarium meet de eigenaar [OH<sup>−</sup>]=2,0×10<sup>−6</sup> M. (a) Bereken pOH en pH. (b) Is dit veilig voor goudvissen (optimaal pH 6,5–7,5)? (c) Welk volume 0,10 M HCl is nodig om 200 L water terug naar pH=7,2 te brengen?',
a:'(a) pOH = −log(2,0×10<sup>−6</sup>) = <b>5,70</b> → pH = <b>8,30</b><br>(b) <b>Te basisch</b> voor goudvissen (pH > 7,5).<br>(c) Bij pH=7,2: [H<sup>+</sup>]=10<sup>−7,2</sup>=6,3×10<sup>−8</sup>, [OH<sup>−</sup>]=1,6×10<sup>−7</sup>. Δ[OH<sup>−</sup>] ≈ 2,0×10<sup>−6</sup> → n(OH<sup>−</sup> wegnemen) = 4,0×10<sup>−4</sup> mol → V(HCl) = 4,0×10<sup>−4</sup>/0,10 = <b>4,0 mL</b>'},
{s:2,q:'In oceaan-verzuring daalde de pH sinds 1850 van 8,21 naar 8,10 (huidige toestand). (a) Bereken de relatieve toename in [H<sub>3</sub>O<sup>+</sup>]. (b) Druk dit uit in procent. (c) Welk effect heeft dit op CaCO<sub>3</sub>-skeletten van koralen via CaCO<sub>3</sub>+2H<sup>+</sup>→Ca<sup>2+</sup>+H<sub>2</sub>CO<sub>3</sub>?',
a:'(a) [H<sup>+</sup>]<sub>oud</sub>=10<sup>−8,21</sup>=6,17×10<sup>−9</sup> · [H<sup>+</sup>]<sub>nu</sub>=10<sup>−8,10</sup>=7,94×10<sup>−9</sup> → factor 7,94/6,17 = <b>1,29</b>×<br>(b) <b>+29%</b> meer H<sup>+</sup>-ionen<br>(c) Skeletoplossing versnelt evenredig (kinetiek ∝ [H<sup>+</sup>]) → koralen verkleinen en verkalken slechter. Tegelijk daalt CO<sub>3</sub><sup>2−</sup>-beschikbaarheid → CaCO<sub>3</sub>-vorming wordt thermodynamisch ongunstiger.'},
{s:2,q:'In de productie van fotopapier moet een fixeerbad pH=5,0 strikt aanhouden. Een bad bevat aanvankelijk water bij pH=7,0. (a) Welke [H<sup>+</sup>] is gewenst? (b) Welk volume 1,0 M HCl is nodig om 50 L water naar pH=5,0 te brengen? (c) Wat als per ongeluk NaOH werd toegevoegd waardoor [OH<sup>−</sup>]=10<sup>−3</sup> M ontstaat — bereken het totale volume HCl 1,0 M nodig om eerst te neutraliseren én daarna tot pH=5,0 te brengen.',
a:'(a) [H<sup>+</sup>] = 10<sup>−5</sup> M<br>(b) n(H<sup>+</sup> nodig) = 10<sup>−5</sup>·50 = <b>5×10<sup>−4</sup> mol → V = 0,50 mL</b><br>(c) Met [OH<sup>−</sup>]=10<sup>−3</sup> M in 50 L: n(OH<sup>−</sup>)=0,050 mol → moet eerst weg via 0,050 mol HCl. Daarna nog 5×10<sup>−4</sup> mol extra → totaal 0,0505 mol → V = <b>50,5 mL</b>'},
{s:3,q:'Een industriële afvalwaterstroom heeft pH=2,0. Voor lozing in oppervlaktewater moet pH tussen 6,5 en 8,5. (a) Bereken [H<sup>+</sup>]. (b) Welke molaire hoeveelheid NaOH per L is nodig om pH=7,0 te bereiken? (c) Verklaar waarom overdosering vaak gebeurt in praktijk. (d) Met welke factor verandert [H<sup>+</sup>] bij pH-stijging van 2 naar 7?',
a:'(a) [H<sup>+</sup>] = 10<sup>−2</sup> = <b>0,010 M</b><br>(b) Δn(H<sup>+</sup>) ≈ 0,010 mol/L → <b>0,010 mol NaOH/L</b><br>(c) Bij benadering van pH=7 verlopen kleine extra NaOH-doseringen tot grote pH-sprongen wegens de log-schaal; gemakkelijk te overschrijden tot pH 11–12.<br>(d) Factor 10<sup>2</sup>/10<sup>7</sup> = <b>10<sup>−5</sup> (100 000× minder H<sup>+</sup>)</b>'},
]},

{id:'3.5',t:'pH-berekeningen',sub:'Sterk/zwak · formules · verificatie α',c1:true,
th:[
'Sterk zuur c mol/L: [H<sub>3</sub>O<sup>+</sup>] = c → pH = −log(c)',
'Sterke base c mol/L: [OH<sup>−</sup>] = c → pOH = −log(c) → pH = 14 − pOH',
'Zwak zuur (α < 5%): [H<sub>3</sub>O<sup>+</sup>] ≈ √(K<sub>z</sub> · c)',
'Verificatie ionisatiegraad: α = [H<sub>3</sub>O<sup>+</sup>]/c × 100% &lt; 5%',
'<b>Valkuil:</b> bij hoge verdunning of zeer zwak zuur kan α > 5% → benadering ongeldig',
],
fm:'Sterk zuur: pH = −log(c)\nSterke base: pH = 14 + log(c)\nZwak zuur: [H<sub>3</sub>O<sup>+</sup>] = √(K<sub>z</sub>·c)\nα = [H<sub>3</sub>O<sup>+</sup>]/c × 100%',
exo:[
{s:1,q:'In een schoonmaakproduct staat 0,15 M HCl op het etiket. (a) Bereken pH. (b) Welk volume moet je 10× verdunnen voor een mildere oplossing — bereken nieuwe pH. (c) Welk volume puur water nodig is om 50 mL van het origineel naar precies pH=2,18 te brengen.',
a:'(a) pH = −log(0,15) = <b>0,82</b><br>(b) c<sub>nieuw</sub> = 0,015 M → pH = −log(0,015) = <b>1,82</b><br>(c) Doel [H<sup>+</sup>]=10<sup>−2,18</sup>=6,61×10<sup>−3</sup>; via c<sub>1</sub>V<sub>1</sub>=c<sub>2</sub>V<sub>2</sub>: 0,15·50 = 6,61×10<sup>−3</sup>·V<sub>2</sub> → V<sub>2</sub> = 1135 mL → V(water) = <b>1085 mL</b>'},
{s:1,q:'In het labo bereid je 250 mL natronloog 0,500 M door NaOH (M=40) op te lossen. (a) Welke massa NaOH is nodig? (b) Bereken pH. (c) NaOH-pellets zijn hygroscopisch. Als ze 5,0 m% water hebben opgenomen, welke werkelijke [NaOH] heb je gemaakt?',
a:'(a) m = 0,250·0,500·40 = <b>5,00 g</b><br>(b) [OH<sup>−</sup>]=0,500 → pOH = −log(0,500) = 0,301 → pH = <b>13,70</b><br>(c) Werkelijke NaOH-massa = 5,00·(1−0,05) = 4,75 g → c = 4,75/(40·0,250) = <b>0,475 M</b>; pH = 13,68 (klein verschil door log-schaal).'},
{s:1,q:'Een chemiestudent meet pH=2,88 voor 0,100 M CH<sub>3</sub>COOH (K<sub>z</sub>=1,74×10<sup>−5</sup>). (a) Bevestig met de formule [H<sup>+</sup>]=√(K<sub>z</sub>·c). (b) Bereken α. (c) Is de benadering geldig?',
a:'(a) [H<sup>+</sup>] = √(1,74×10<sup>−5</sup> × 0,100) = √(1,74×10<sup>−6</sup>) = <b>1,32×10<sup>−3</sup> M</b> → pH = 2,88 ✓<br>(b) α = 1,32×10<sup>−3</sup>/0,100 · 100% = <b>1,32%</b><br>(c) <b>Ja, α < 5% — geldig</b>.'},
{s:1,q:'Bij verdunning van azijnzuur (K<sub>z</sub>=1,74×10<sup>−5</sup>) van 1,0 M naar 0,0010 M zie je een onverwacht effect. (a) Bereken pH bij beide concentraties. (b) Bereken α bij beide. (c) Verklaar de stijging van α via Le Chatelier.',
a:'(a) c=1,0: [H<sup>+</sup>]=√(1,74×10<sup>−5</sup>)=4,17×10<sup>−3</sup> → pH=<b>2,38</b> · c=10<sup>−3</sup>: [H<sup>+</sup>]=√(1,74×10<sup>−8</sup>)=1,32×10<sup>−4</sup> → pH=<b>3,88</b><br>(b) α<sub>1,0</sub>=0,42% · α<sub>0,001</sub>=<b>13,2%</b> (benadering ongeldig)<br>(c) Le Chatelier: verdunning verschuift evenwicht CH<sub>3</sub>COOH ⇌ H<sup>+</sup> + CH<sub>3</sub>COO<sup>−</sup> naar rechts (meer deeltjes) → grotere ionisatiegraad.'},
{s:2,q:'In de farmaceutische industrie bereid je een 0,050 M benzoëzuur-oplossing als bewaarmiddel (C<sub>6</sub>H<sub>5</sub>COOH, K<sub>z</sub>=6,3×10<sup>−5</sup>). Effectiviteit vereist pH < 4. (a) Bereken pH. (b) Bereken α. (c) Wat gebeurt er bij verdunning met 100 mL water (start: 100 mL)?',
a:'(a) [H<sup>+</sup>] = √(6,3×10<sup>−5</sup>·0,050) = √(3,15×10<sup>−6</sup>) = 1,77×10<sup>−3</sup> → pH = <b>2,75</b><br>(b) α = 1,77×10<sup>−3</sup>/0,050 · 100% = <b>3,55%</b> — geldig<br>(c) Nieuwe c = 0,025 M → [H<sup>+</sup>] = √(6,3×10<sup>−5</sup>·0,025) = 1,25×10<sup>−3</sup> → pH = <b>2,90</b>. Nog steeds pH < 4 ✓ — bewaarmiddel werkt nog.'},
{s:2,q:'Voor een frisdrank voeg je 2,00 g citroenzuur (M=192, eenvoudig benaderd als eenwaardig met K<sub>z</sub>≈7,4×10<sup>−4</sup>) toe aan 250 mL water. (a) Bereken c. (b) Bereken pH met de zwak-zuur benadering. (c) Controleer α en geef commentaar.',
a:'(a) c = 2,00/(192·0,250) = <b>0,0417 M</b><br>(b) [H<sup>+</sup>] = √(7,4×10<sup>−4</sup>·0,0417) = √(3,09×10<sup>−5</sup>) = 5,55×10<sup>−3</sup> → pH = <b>2,26</b><br>(c) α = 5,55×10<sup>−3</sup>/0,0417 · 100% = <b>13,3% > 5%</b> — benadering ongeldig; precieze quadratische formule nodig. Maar de orde van grootte klopt: pH ligt tussen 2 en 3 (duidelijk zuur).'},
{s:3,q:'In een mengtank uit een chemische plant komen twee stromen samen: 100 L 0,30 M HCl + 200 L 0,15 M CH<sub>3</sub>COOH (K<sub>z</sub>=1,74×10<sup>−5</sup>). (a) Bereken de nieuwe concentraties na vermenging. (b) Bereken pH — domineert HCl, of moet je beide meetellen? Bewijs kwantitatief. (c) Verklaar via massa-effect waarom CH<sub>3</sub>COOH onderdrukt wordt.',
a:'(a) V<sub>tot</sub>=300 L → c(HCl)=0,100 M · c(CH<sub>3</sub>COOH)=0,100 M<br>(b) HCl: [H<sup>+</sup>]=0,100 M → pH=<b>1,00</b>. Bijdrage CH<sub>3</sub>COOH bij dit [H<sup>+</sup>]: K<sub>z</sub>=[H<sup>+</sup>][A<sup>−</sup>]/[HA] → [A<sup>−</sup>]/[HA] = 1,74×10<sup>−5</sup>/0,100 = 1,74×10<sup>−4</sup> → α<0,02% — verwaarloosbaar.<br>(c) Massa-effect: hoge [H<sup>+</sup>] van HCl drukt het CH<sub>3</sub>COOH-evenwicht naar links (Le Chatelier) — CH<sub>3</sub>COOH levert geen significant extra H<sup>+</sup> meer.'},
]},

{id:'3.6',t:'Zuur-base titratie',sub:'Equivalentiepunt · indicator · valentiewet',c1:false,
th:[
'Equivalentiepunt: alle zuur geneutraliseerd door base (stoichiometrisch punt)',
'Valentiewet: n<sub>z</sub>·c<sub>z</sub>·V<sub>z</sub> = n<sub>b</sub>·c<sub>b</sub>·V<sub>b</sub> &nbsp;(n = valentie)',
'Indicator kiest op basis van pH bij equivalentiepunt, niet altijd pH = 7',
'Fenolftaleïne: kleurwissel pH 8–10 &nbsp;·&nbsp; methyloranje: pH 3–4',
'<b>Valkuil:</b> V<sub>z</sub> en V<sub>b</sub> in dezelfde eenheid (mL of L)!',
],
fm:'n<sub>z</sub>·c<sub>z</sub>·V<sub>z</sub> = n<sub>b</sub>·c<sub>b</sub>·V<sub>b</sub>\n(n = valentie; V in mL of L — eenheden consistent!)',
exo:[
{s:1,q:'Bij een leerlingenproef wordt 20,0 mL HCl van onbekende concentratie getitreerd met 0,100 M NaOH; verbruik 18,4 mL bij fenolftaleïne-omslag. (a) Bereken c(HCl). (b) Welk volume HCl was theoretisch nodig om 1,00 g CaCO<sub>3</sub> (M=100) te neutraliseren via CaCO<sub>3</sub>+2HCl? (c) Wat zou methyloranje als indicator gegeven hebben?',
a:'(a) 1·c<sub>z</sub>·20,0 = 1·0,100·18,4 → c(HCl) = <b>0,0920 M</b><br>(b) n(CaCO<sub>3</sub>) = 0,010 mol → n(HCl) = 0,020 mol → V = 0,020/0,092 = <b>0,217 L = 217 mL</b><br>(c) Bij sterk-sterk titratie geeft methyloranje (omslag 3,1–4,4) een lichte over-titratie maar werkt wel — pH-sprong is steil. Beide indicatoren zijn aanvaardbaar.'},
{s:1,q:'Uit een autobatterij wordt 25,0 mL H<sub>2</sub>SO<sub>4</sub>-monster getitreerd met 1,00 M NaOH; verbruik 32,5 mL. (a) Schrijf de neutralisatiereactie. (b) Bereken c(H<sub>2</sub>SO<sub>4</sub>) via de valentiewet. (c) Bereken de massaconcentratie in g/L (M=98).',
a:'(a) H<sub>2</sub>SO<sub>4</sub> + 2 NaOH → Na<sub>2</sub>SO<sub>4</sub> + 2 H<sub>2</sub>O<br>(b) 2·c<sub>z</sub>·25,0 = 1·1,00·32,5 → c(H<sub>2</sub>SO<sub>4</sub>) = <b>0,650 M</b><br>(c) ρ = 0,650·98 = <b>63,7 g/L</b>'},
{s:1,q:'In een wijnanalyse meet je het azijnzuurgehalte. 25,0 mL wijn getitreerd met 0,050 M NaOH, verbruik 12,4 mL. Andere zuren verwaarloosd. (a) Bereken c(CH<sub>3</sub>COOH). (b) Welke indicator is geschikt? Verklaar via EP. (c) Druk uit in g/100 mL (M=60).',
a:'(a) c = 0,050·12,4/25,0 = <b>0,0248 M</b><br>(b) Zwak-sterk titratie → EP bij pH ≈ 8,7 (basisch, want CH<sub>3</sub>COO<sup>−</sup> is zwakke base) → <b>fenolftaleïne</b> (omslag 8,2–10,0).<br>(c) m/V = 0,0248·60·100/1000 = <b>0,149 g/100 mL</b> = 1,49 g/L (= 0,149%).'},
{s:1,q:'Een industriële natronloog-staal (NaOH met verontreinigingen) van 0,500 g wordt opgelost en getitreerd met 0,200 M HCl; verbruik 56,0 mL. (a) Bereken n(HCl). (b) Bereken n(NaOH) en massa NaOH. (c) Bereken de zuiverheid in m%.',
a:'(a) n(HCl) = 0,200·0,0560 = <b>0,01120 mol</b><br>(b) n(NaOH) = 0,01120 mol → m = 0,01120·40 = <b>0,448 g</b><br>(c) Zuiverheid = 0,448/0,500·100% = <b>89,6%</b>'},
{s:2,q:'In een fosforzuur-cola titratie: 50,0 mL cola (verwaarloos andere zuren) wordt getitreerd met 0,0500 M NaOH; bij fenolftaleïne-omslag (eerste EP voor 2 protonen H<sub>3</sub>PO<sub>4</sub>→HPO<sub>4</sub><sup>2−</sup>) verbruik 13,7 mL. (a) Schrijf de gebalanceerde reactie. (b) Bereken c(H<sub>3</sub>PO<sub>4</sub>). (c) Schat de pH bij eerste én tweede EP (pK<sub>z1</sub>=2,15; pK<sub>z2</sub>=7,20; pK<sub>z3</sub>=12,35).',
a:'(a) H<sub>3</sub>PO<sub>4</sub> + 2 NaOH → Na<sub>2</sub>HPO<sub>4</sub> + 2 H<sub>2</sub>O<br>(b) 2·c·50,0 = 0,0500·13,7 → c(H<sub>3</sub>PO<sub>4</sub>) = <b>0,00685 M</b><br>(c) EP1 (mengsel H<sub>2</sub>PO<sub>4</sub><sup>−</sup>/HPO<sub>4</sub><sup>2−</sup>): pH ≈ (pK<sub>z1</sub>+pK<sub>z2</sub>)/2 = <b>4,68</b><br>EP2 (mengsel HPO<sub>4</sub><sup>2−</sup>/PO<sub>4</sub><sup>3−</sup>): pH ≈ (pK<sub>z2</sub>+pK<sub>z3</sub>)/2 = <b>9,78</b>'},
{s:2,q:'Een onbekend mengsel van HCl + CH<sub>3</sub>COOH wordt getitreerd met 0,100 M NaOH. Eerste omslag bij methyloranje (pH ≈ 4) na 22,5 mL — geldt voor HCl. Tweede omslag bij fenolftaleïne (pH ≈ 8,5) na nog eens 18,5 mL — geldt voor CH<sub>3</sub>COOH. (a) Bereken n(HCl) en n(CH<sub>3</sub>COOH). (b) Waarom zijn twee aparte indicatoren nodig? (c) Bereken V<sub>tot</sub>(NaOH).',
a:'(a) n(HCl) = 0,100·0,0225 = <b>2,25×10<sup>−3</sup> mol</b> · n(CH<sub>3</sub>COOH) = 0,100·0,0185 = <b>1,85×10<sup>−3</sup> mol</b><br>(b) HCl titreert eerst (sterker zuur), zijn EP ligt bij pH≈7. Daarna pas CH<sub>3</sub>COOH, met EP bij pH>7 (acetaation hydrolyseert). Twee indicatoren markeren elke EP afzonderlijk.<br>(c) V<sub>tot</sub> = 22,5 + 18,5 = <b>41,0 mL</b>'},
{s:3,q:'In een Na<sub>2</sub>CO<sub>3</sub>+NaHCO<sub>3</sub> mengsel-analyse (zwembad-alkaliteit). 25,0 mL staal getitreerd met 0,100 M HCl. Fenolftaleïne (V<sub>1</sub>=8,0 mL: tot HCO<sub>3</sub><sup>−</sup>); methyloranje (V<sub>tot</sub>=22,5 mL: tot H<sub>2</sub>CO<sub>3</sub>→CO<sub>2</sub>+H<sub>2</sub>O). (a) Bereken n(Na<sub>2</sub>CO<sub>3</sub>) en n(NaHCO<sub>3</sub>). (b) Druk uit in c(M). (c) Verklaar de twee EP-stappen.',
a:'(a) Stap 1 (V<sub>1</sub>): CO<sub>3</sub><sup>2−</sup>+H<sup>+</sup>→HCO<sub>3</sub><sup>−</sup>. n(CO<sub>3</sub><sup>2−</sup>) = 0,100·0,008 = 8,0×10<sup>−4</sup> mol.<br>Stap 2 (V<sub>2</sub>=V<sub>tot</sub>−V<sub>1</sub>=14,5 mL): voor (originele NaHCO<sub>3</sub> + nieuw gevormde HCO<sub>3</sub><sup>−</sup> uit Na<sub>2</sub>CO<sub>3</sub>) → n(HCO<sub>3</sub><sup>−</sup> totaal) = 0,100·0,0145 = 1,45×10<sup>−3</sup> mol. Originele NaHCO<sub>3</sub> = 1,45×10<sup>−3</sup> − 8,0×10<sup>−4</sup> = <b>6,5×10<sup>−4</sup> mol</b>.<br>(b) c(Na<sub>2</sub>CO<sub>3</sub>) = 8,0×10<sup>−4</sup>/0,025 = <b>0,032 M</b> · c(NaHCO<sub>3</sub>) = 6,5×10<sup>−4</sup>/0,025 = <b>0,026 M</b>.<br>(c) Fenolftaleïne markeert eind van eerste deprotonatie (basisch EP); methyloranje detecteert tweede stap (CO<sub>2</sub>-vrijzetting, zuur EP).'},
]},

{id:'3.7',t:'Buffermengsels',sub:'Henderson-Hasselbalch · bloedbuffer · buffercapaciteit',c1:false,
th:[
'Buffer = zwak zuur + zijn geconjugeerde base (of zwakke base + geconj. zuur)',
'pH = pK<sub>z</sub> + log([A<sup>−</sup>]/[HA]) &nbsp;(Henderson-Hasselbalch)',
'Buffer weerstaat pH-verandering: toegevoegd zuur reageert met A<sup>−</sup>; base met HA',
'Bloedbuffer: HCO<sub>3</sub><sup>−</sup>/CO<sub>2</sub> houdt pH tussen 7,35 en 7,45',
'<b>Buffercapaciteit:</b> groter bij hogere concentraties; maximaal bij [A<sup>−</sup>] = [HA] (pH = pK<sub>z</sub>)',
],
fm:'pH = pK<sub>z</sub> + log([A<sup>−</sup>]/[HA])\npK<sub>z</sub>(CH<sub>3</sub>COOH) = 4,76',
exo:[
{s:1,q:'Een biochemicus bereidt 500 mL acetaatbuffer pH=4,76 met 0,10 M CH<sub>3</sub>COOH en 0,10 M CH<sub>3</sub>COONa (pK<sub>z</sub>=4,76). (a) Welke molaire hoeveelheden zijn nodig? (b) Welk effect heeft toevoeging van 5,0 mmol HCl op de pH? (c) Bereken de nieuwe pH.',
a:'(a) n = c·V = 0,10·0,500 = <b>0,050 mol elk</b><br>(b) HCl reageert met CH<sub>3</sub>COO<sup>−</sup> → vermindert base, verhoogt zuur<br>(c) n(zuur) = 50+5 = 55 mmol; n(base) = 50−5 = 45 mmol → pH = 4,76 + log(45/55) = 4,76 − 0,087 = <b>4,67</b> (ΔpH = −0,09 — buffer werkt)'},
{s:1,q:'Voor een tandheelkundig spoelmiddel wil je pH=5,00 met acetaatbuffer (pK<sub>z</sub>=4,76). (a) Bereken de verhouding [CH<sub>3</sub>COO<sup>−</sup>]/[CH<sub>3</sub>COOH]. (b) Hoeveel CH<sub>3</sub>COONa·3H<sub>2</sub>O (M=136) nodig in 1,0 L 0,10 M CH<sub>3</sub>COOH? (c) Wat is de nieuwe pH bij toevoeging van 1,0 mmol NaOH?',
a:'(a) log(r) = 5,00 − 4,76 = 0,24 → r = <b>1,74</b><br>(b) n(zout) = 0,174·1,0 = 0,174 mol → m = 0,174·136 = <b>23,7 g</b><br>(c) NaOH+HA→A<sup>−</sup>+H<sub>2</sub>O. [HA]=0,099; [A<sup>−</sup>]=0,175 → pH = 4,76 + log(1,768) = <b>5,01</b> (ΔpH ≈ +0,01)'},
{s:1,q:'In cosmetica gebruikt men fosfaatbuffer bij pH=7,40 (pK<sub>z2</sub>=7,20). (a) Bereken [HPO<sub>4</sub><sup>2−</sup>]/[H<sub>2</sub>PO<sub>4</sub><sup>−</sup>]. (b) Bereken massa Na<sub>2</sub>HPO<sub>4</sub> (M=142) en NaH<sub>2</sub>PO<sub>4</sub> (M=120) per liter voor totaal 0,200 mol. (c) Welke ΔpH bij 1,0 mmol HCl/L?',
a:'(a) r = 10<sup>(7,40−7,20)</sup> = 10<sup>0,20</sup> = <b>1,585</b><br>(b) c(A<sup>−</sup>) = 0,200·1,585/2,585 = 0,1226 M → m = 17,4 g Na<sub>2</sub>HPO<sub>4</sub>. c(HA) = 0,0774 M → m = <b>9,29 g NaH<sub>2</sub>PO<sub>4</sub></b><br>(c) Na 1 mmol HCl: c(HA)=0,0784; c(A<sup>−</sup>)=0,1216 → pH=7,20+log(1,551)=7,39. <b>ΔpH ≈ −0,01</b>'},
{s:1,q:'Het bloedbuffer H<sub>2</sub>CO<sub>3</sub>/HCO<sub>3</sub><sup>−</sup> (pK<sub>z</sub>=6,35) houdt bloed pH=7,40. (a) Bereken [HCO<sub>3</sub><sup>−</sup>]/[H<sub>2</sub>CO<sub>3</sub>]. (b) Bij hyperventilatie daalt [H<sub>2</sub>CO<sub>3</sub>] met 30%. Bereken nieuwe pH. (c) Welke fysiologische reflex herstelt dit?',
a:'(a) r = 10<sup>(7,40−6,35)</sup> = 10<sup>1,05</sup> = <b>11,2</b><br>(b) Nieuwe r = 11,2/0,70 = 16,0 → pH = 6,35 + log(16,0) = <b>7,55</b><br>(c) Lichaam vertraagt ademhalingstempo → CO<sub>2</sub> stapelt → H<sub>2</sub>CO<sub>3</sub>-niveau herstelt → pH daalt terug naar 7,40 (respiratoire alkalose-correctie).'},
{s:2,q:'In een zwembad wordt soms karbonaat-buffer gehandhaafd. Bij pH=8,0 is HCO<sub>3</sub><sup>−</sup>/CO<sub>3</sub><sup>2−</sup> (pK<sub>z3</sub>=10,33) niet ideaal. (a) Bereken r — toon kwantitatief waarom de buffer ineffectief is. (b) Bij welke pH zou hij optimaal werken? (c) Welk ander zuur-base koppel is geschikter voor pH=8,0?',
a:'(a) r = 10<sup>(8,0−10,33)</sup> = 10<sup>−2,33</sup> = <b>4,7×10<sup>−3</sup></b> — bijna alle koolstof zit als HCO<sub>3</sub><sup>−</sup>, slechts 0,5% als CO<sub>3</sub><sup>2−</sup>. Buffercapaciteit minimaal (ratio ver van 1).<br>(b) Optimaal bij <b>pH = pK<sub>z3</sub> = 10,33</b>.<br>(c) Tris-buffer (pK<sub>z</sub>=8,1) of NH<sub>4</sub><sup>+</sup>/NH<sub>3</sub> (pK<sub>z</sub>=9,25) liggen dichter bij pH=8.'},
{s:2,q:'In een industrieel gistingsproces voor yoghurt moet pH=4,50 (optimum lactobacillen). pK<sub>z</sub>(melkzuur)=3,86. (a) Bereken [lactaat<sup>−</sup>]/[melkzuur]. (b) Bereken massa natriumlactaat (M=112) en volume 0,50 M melkzuur (M=90) voor 5,0 L buffer met c<sub>tot</sub>=0,15 M. (c) Wat is de pH na 10 mmol/L HCl toevoeging?',
a:'(a) r = 10<sup>(4,50−3,86)</sup> = 10<sup>0,64</sup> = <b>4,37</b><br>(b) c(A<sup>−</sup>) = 0,15·4,37/5,37 = 0,1221 M → m = 0,1221·5,0·112 = <b>68,4 g</b>. c(HA) = 0,0279 M → V = 0,0279·5,0/0,50 = <b>0,279 L = 279 mL</b>.<br>(c) Na 10 mmol/L HCl: c(HA)=0,0379; c(A<sup>−</sup>)=0,1121 → pH = 3,86 + log(2,957) = <b>4,33</b>. ΔpH = −0,17 — buffer is op grens van capaciteit door asymmetrische samenstelling.'},
{s:3,q:'Een leerling ontwerpt een acetaatbuffer pH=4,50 (pK<sub>z</sub>=4,76) door 0,10 mol CH<sub>3</sub>COOH te combineren met X mol NaOH in 1,0 L. (a) Welke X nodig (NaOH neutraliseert HA → A<sup>−</sup>)? (b) Bereken de buffercapaciteit β ≈ 2,303·[HA]·[A<sup>−</sup>]/c<sub>tot</sub>. (c) Hoe verandert β bij verdubbeling van alle concentraties?',
a:'(a) r = [A<sup>−</sup>]/[HA] = 10<sup>(4,50−4,76)</sup> = 10<sup>−0,26</sup> = 0,549. [HA]+[A<sup>−</sup>] = 0,10 → [A<sup>−</sup>] = 0,0354; [HA] = 0,0646. Per L: <b>X = 0,0354 mol NaOH</b>.<br>(b) β = 2,303·0,0646·0,0354/0,10 = <b>0,0527 mol/L per ΔpH=1</b><br>(c) Bij verdubbeling: c<sub>tot</sub>=0,20 M, beide componenten ×2 → β = 2,303·0,1292·0,0708/0,20 = <b>0,1053</b>. Capaciteit <b>verdubbelt</b> evenredig met totale concentratie.'},
]},
],

H4:[
{id:'4.1',t:'Oxidatiegetal',sub:'Regels · OG stijgt bij oxidatie · daalt bij reductie',c1:true,
th:[
'OG = fictief lading van atoom als alle bindingen ionisch zijn',
'Regels: vrij element = 0 &nbsp;·&nbsp; enkelvoudig ion = lading &nbsp;·&nbsp; ΣOG = 0 (molecule) of lading (ion)',
'O = −2 (uitzondering: peroxide = −1) &nbsp;·&nbsp; H = +1 (uitzondering: metaalhydride = −1)',
'<b>Oxidatie</b>: OG stijgt (verlies elektronen) &nbsp;·&nbsp; <b>Reductie</b>: OG daalt (opname elektronen)',
'<b>Onthoud:</b> OIL RIG — Oxidation Is Loss, Reduction Is Gain (van elektronen)',
],
fm:'ΣOG(molecule) = 0\nΣOG(ion) = lading\nO = −2, H = +1 (standaard)',
exo:[
{s:1,q:'Bij ontlading van een autobatterij: Pb + PbO<sub>2</sub> + 2H<sub>2</sub>SO<sub>4</sub> → 2PbSO<sub>4</sub> + 2H<sub>2</sub>O. (a) Bepaal OG van Pb in alle drie loodverbindingen. (b) Identificeer welk Pb-atoom oxidatie ondergaat en welk reductie. (c) Bereken het totaal aantal e<sup>−</sup> uitgewisseld per 2 mol PbSO<sub>4</sub>.',
a:'(a) Pb (metaal): <b>0</b> · PbO<sub>2</sub>: <b>+4</b> (Pb + 2(−2) = 0) · PbSO<sub>4</sub>: <b>+2</b> (SO<sub>4</sub><sup>2−</sup> = −2 → Pb = +2)<br>(b) Pb (0→+2): <b>oxidatie</b>, 2 e<sup>−</sup> afgegeven · Pb in PbO<sub>2</sub> (+4→+2): <b>reductie</b>, 2 e<sup>−</sup> opgenomen<br>(c) Totaal: 2 e<sup>−</sup> uitgewisseld per Pb-atoom × 2 = <b>4 e<sup>−</sup></b>'},
{s:1,q:'Bij Fe<sup>2+</sup>-bepaling met KMnO<sub>4</sub>: 2KMnO<sub>4</sub> + 10FeSO<sub>4</sub> + 8H<sub>2</sub>SO<sub>4</sub> → K<sub>2</sub>SO<sub>4</sub> + 2MnSO<sub>4</sub> + 5Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 8H<sub>2</sub>O. (a) Bepaal OG van Mn vóór en na, en Fe vóór en na. (b) Welk element oxideert, welk reduceert? (c) Bereken e<sup>−</sup> per mol KMnO<sub>4</sub>.',
a:'(a) Mn: <b>+7</b> (KMnO<sub>4</sub>) → <b>+2</b> (MnSO<sub>4</sub>) · Fe: <b>+2</b> (FeSO<sub>4</sub>) → <b>+3</b> (Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>)<br>(b) Mn <b>reduceert</b> (OG daalt); Fe <b>oxideert</b> (OG stijgt). KMnO<sub>4</sub> = oxidans; FeSO<sub>4</sub> = reductor.<br>(c) Per mol KMnO<sub>4</sub>: Mn neemt <b>5 e<sup>−</sup></b> op (van 5 Fe<sup>2+</sup>).'},
{s:1,q:'In de fotosynthese: 6CO<sub>2</sub> + 6H<sub>2</sub>O → C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub>. (a) Bepaal OG van C in CO<sub>2</sub> en (gemiddeld) in C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>. (b) Bepaal OG van O in H<sub>2</sub>O en in O<sub>2</sub>. (c) Welk proces ondergaat C, welk O?',
a:'(a) C in CO<sub>2</sub>: <b>+4</b> · C in glucose (6C + 12(+1) + 6(−2) = 0 → 6C = −6 → C = <b>0</b> gemiddeld)<br>(b) O in H<sub>2</sub>O: <b>−2</b> · O in O<sub>2</sub>: <b>0</b><br>(c) C: +4 → 0 = <b>reductie</b> (zon-energie reduceert CO<sub>2</sub> tot suiker). O: −2 → 0 = <b>oxidatie</b> (water levert elektronen).'},
{s:1,q:'In bleekmiddel ondergaat NaClO bij verhitting een ongebruikelijke reactie: 3NaClO → 2NaCl + NaClO<sub>3</sub>. (a) Bepaal OG van Cl in alle drie verbindingen. (b) Welk Cl-atoom oxideert, welk reduceert? (c) Verklaar waarom dit een <b>disproportionering</b> heet.',
a:'(a) NaClO: <b>+1</b> · NaCl: <b>−1</b> · NaClO<sub>3</sub>: <b>+5</b><br>(b) 2 Cl (van +1 → −1): <b>reductie</b>; 1 Cl (van +1 → +5): <b>oxidatie</b><br>(c) Hetzelfde element (Cl) ondergaat zowel oxidatie als reductie binnen dezelfde reactie → disproportionering. Slechts mogelijk bij elementen met meerdere stabiele OG-waarden.'},
{s:2,q:'In de stikstof-cyclus in landbouw reduceren Pseudomonas-bacteriën nitraat tot N<sub>2</sub>-gas (denitrificatie): NO<sub>3</sub><sup>−</sup> → NO<sub>2</sub><sup>−</sup> → NO → N<sub>2</sub>O → N<sub>2</sub>. (a) Bepaal OG van N in elke stap. (b) Bereken het totaal aantal e<sup>−</sup> opgenomen per N-atoom van begin tot eind. (c) Welk milieukundig effect heeft denitrificatie?',
a:'(a) NO<sub>3</sub><sup>−</sup>: <b>+5</b> → NO<sub>2</sub><sup>−</sup>: <b>+3</b> → NO: <b>+2</b> → N<sub>2</sub>O: <b>+1</b> → N<sub>2</sub>: <b>0</b><br>(b) Totaal van +5 naar 0 = <b>5 e<sup>−</sup> opgenomen per N-atoom</b><br>(c) Verwijdert reactieve N (nitraat) uit het ecosysteem → minder nitraat-uitloging naar grondwater, maar ook minder N voor gewassen → boer compenseert met bemesting (vicieuze cirkel in stikstof-overbelasting).'},
{s:2,q:'H<sub>2</sub>O<sub>2</sub> is een redox-amfoter: het kan zowel oxidans als reductor zijn. (a) In 2Fe<sup>2+</sup> + H<sub>2</sub>O<sub>2</sub> + 2H<sup>+</sup> → 2Fe<sup>3+</sup> + 2H<sub>2</sub>O: bepaal OG van O in H<sub>2</sub>O<sub>2</sub> en H<sub>2</sub>O — is H<sub>2</sub>O<sub>2</sub> hier oxidans of reductor? (b) In 2MnO<sub>4</sub><sup>−</sup> + 5H<sub>2</sub>O<sub>2</sub> + 6H<sup>+</sup> → 2Mn<sup>2+</sup> + 5O<sub>2</sub> + 8H<sub>2</sub>O: idem. (c) Verklaar deze dubbele rol via het ongewone OG = −1 van O in H<sub>2</sub>O<sub>2</sub>.',
a:'(a) O in H<sub>2</sub>O<sub>2</sub>: <b>−1</b>; O in H<sub>2</sub>O: <b>−2</b>. O wordt gereduceerd → H<sub>2</sub>O<sub>2</sub> = <b>oxidans</b> (Fe<sup>2+</sup>→Fe<sup>3+</sup> oxideert).<br>(b) O in O<sub>2</sub>: <b>0</b>. O wordt geoxideerd → H<sub>2</sub>O<sub>2</sub> = <b>reductor</b> (MnO<sub>4</sub><sup>−</sup>→Mn<sup>2+</sup> reduceert).<br>(c) OG = −1 ligt tussen 0 (O<sub>2</sub>) en −2 (H<sub>2</sub>O) → kan zowel naar boven (oxidatie) als naar beneden (reductie) bewegen. Vandaar de dubbele rol.'},
{s:3,q:'In een chemische analyse van staal moet je het Cr-gehalte bepalen. Een staal van 0,500 g wordt oxidatief omgezet zodat alle Cr → Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup>. De oplossing wordt aangevuld tot 100 mL; daarvan wordt 10,0 mL getitreerd en je vindt 5,0×10<sup>−5</sup> mol Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup>. (a) Bepaal OG van Cr in Cr-metaal en in Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup>. (b) Hoeveel e<sup>−</sup> uitgewisseld per Cr-atoom in deze omzetting? (c) Bereken massa% Cr in het staal (M(Cr)=52).',
a:'(a) Cr-metaal: <b>0</b>. In Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup>: 2Cr + 7(−2) = −2 → Cr = <b>+6</b><br>(b) 0 → +6 = <b>6 e<sup>−</sup> afgegeven per Cr-atoom</b> (oxidatie)<br>(c) In 10 mL: n(Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup>) = 5,0×10<sup>−5</sup> → n(Cr) = 1,0×10<sup>−4</sup>. In volledige 100 mL: n(Cr) = 1,0×10<sup>−3</sup> mol → m(Cr) = 0,052 g → m% = 0,052/0,500·100% = <b>10,4%</b>'},
]},

{id:'4.2',t:'Spanningsreeks',sub:'Spontaniteit · diagonaalregel · sterke/zwakke reductor',c1:true,
th:[
'Spanningsreeks rangschikt metalen op E<sup>0</sup>: van sterkste reductor (Mg) naar zwakste (Au)',
'<b>Diagonaalregel:</b> reactie is spontaan als het oxidatiemiddel bóven het reductiemiddel staat',
'Sterkste reductor = laagste E<sup>0</sup> (Mg: −2,36 V) &nbsp;·&nbsp; sterkste oxidans = hoogste E<sup>0</sup> (Au: +1,50 V)',
'U<sub>b</sub> = E<sup>0</sup>(kathode) − E<sup>0</sup>(anode) > 0 → spontaan',
],
fm:'Spontaan: oxidans staat in tabel boven reductor\nU<sub>b</sub> = E<sup>0</sup>(kathode) − E<sup>0</sup>(anode) > 0',
exo:[
{s:1,q:'Een leerling dompelt vier metalen (Zn, Fe, Ni, Ag) elk in 1,0 M CuSO<sub>4</sub>. (a) Welke geven een spontane reactie? Verklaar via E<sup>0</sup>. (b) Bereken U<sub>b</sub> voor elke spontane combinatie. (c) Welk metaal lost het snelst op (theoretisch via grootste U<sub>b</sub>)?',
a:'(a) Spontaan als E<sup>0</sup>(metaal) < E<sup>0</sup>(Cu) = +0,34V: <b>Zn (−0,76), Fe (−0,44), Ni (−0,23)</b> reageren. Ag (+0,80) niet.<br>(b) Zn-Cu: 0,34−(−0,76) = <b>+1,10V</b> · Fe-Cu: <b>+0,78V</b> · Ni-Cu: <b>+0,57V</b><br>(c) <b>Zn</b> — grootste U<sub>b</sub> ≈ grootste drijvende kracht.'},
{s:1,q:'Een ijzeren schip wordt beschermd door Zn-verteringselektroden. (a) Verklaar via E<sup>0</sup> waarom Zn de "opofferende" rol vervult. (b) Bereken U<sub>b</sub> van de Zn-Fe corrosie-cel (E<sup>0</sup>(Fe)=−0,44V). (c) Wat gebeurt zodra alle Zn verbruikt is?',
a:'(a) E<sup>0</sup>(Zn) = −0,76V < E<sup>0</sup>(Fe) = −0,44V → Zn is sterkere reductor → wordt eerst geoxideerd in plaats van Fe.<br>(b) U<sub>b</sub> = −0,44 − (−0,76) = <b>+0,32V</b> — spontane Zn-oxidatie.<br>(c) Zonder Zn-bescherming begint Fe zelf te corroderen → roest. Daarom worden Zn-anoden periodiek vervangen op schepen en pijpleidingen.'},
{s:1,q:'In een koffiezetapparaat met Cu-verwarmingselement merk je een witte aanslag van Sn (E<sup>0</sup>(Sn<sup>2+</sup>/Sn)=−0,14V). Een leerling dompelt Cu in 0,1 M SnCl<sub>2</sub>. (a) Reageert Cu spontaan met Sn<sup>2+</sup>? Toon via U<sub>b</sub>. (b) Wat gebeurt bij omgekeerde proef: Sn-elektrode in CuSO<sub>4</sub>? (c) Praktische implicatie voor toestel-onderhoud.',
a:'(a) Cu + Sn<sup>2+</sup>: U<sub>b</sub> = −0,14 − 0,34 = <b>−0,48V < 0 → niet spontaan</b>. Cu lost niet op in SnCl<sub>2</sub>.<br>(b) Sn + Cu<sup>2+</sup>: U<sub>b</sub> = +0,34 − (−0,14) = <b>+0,48V → spontaan</b>. Sn lost op en Cu zet zich af.<br>(c) Tin-aanslag op Cu kan ontstaan als Sn elders in het systeem aanwezig is. Cu-toestellen blijven dus best zonder Sn-onderdelen om corrosie te vermijden.'},
{s:1,q:'Een leerling dompelt 5,2 g Zn (M=65,4) in 200 mL 0,30 M Cu(NO<sub>3</sub>)<sub>2</sub>. (a) Schrijf de spontane redoxreactie en bereken U<sub>b</sub>. (b) Welk reagens is limiterend? (c) Welke massa Cu (M=63,5) wordt theoretisch afgezet?',
a:'(a) Zn + Cu<sup>2+</sup> → Zn<sup>2+</sup> + Cu; U<sub>b</sub> = <b>+1,10V</b><br>(b) n(Zn) = 5,2/65,4 = 0,0795 mol; n(Cu<sup>2+</sup>) = 0,30·0,200 = 0,0600 mol → <b>Cu<sup>2+</sup> limiterend</b><br>(c) n(Cu) = 0,0600 → m = 0,0600·63,5 = <b>3,81 g</b>'},
{s:2,q:'In een vliegtuig zijn Al-onderdelen vastgemaakt op een Fe-staal frame. In vochtige omgeving treedt galvanische corrosie op (E<sup>0</sup>(Al<sup>3+</sup>/Al)=−1,66V; E<sup>0</sup>(Fe<sup>2+</sup>/Fe)=−0,44V). (a) Welk metaal corrodeert het eerst? Verklaar. (b) Bereken U<sub>b</sub>. (c) Welke ontwerpwijziging stopt dit proces?',
a:'(a) <b>Al</b> heeft lagere E<sup>0</sup> → sterkere reductor → wordt anode → corrodeert. Fe blijft gespaard.<br>(b) U<sub>b</sub> = E<sup>0</sup>(Fe) − E<sup>0</sup>(Al) = −0,44 − (−1,66) = <b>+1,22V</b><br>(c) <b>Isolerende laag</b> (kunststof, epoxy) tussen Al en Fe → onderbreekt het elektrische contact → geen galvanische cel → geen versnelde corrosie.'},
{s:2,q:'Een groene chemicus wil Cu<sup>2+</sup> verwijderen uit afvalwater (10 mg Cu<sup>2+</sup>/L) via cementatie met Fe-vijlsel. (a) Schrijf de spontane reactie. (b) Bereken U<sub>b</sub>. (c) Welke massa Fe is minimaal nodig voor 1000 L afvalwater (M(Cu)=63,5; M(Fe)=55,8)?',
a:'(a) Fe + Cu<sup>2+</sup> → Fe<sup>2+</sup> + Cu (s) — Fe-vijlsel "wisselt" voor Cu-poeder<br>(b) U<sub>b</sub> = 0,34 − (−0,44) = <b>+0,78V</b><br>(c) n(Cu<sup>2+</sup>) = 10·1000/63,5/1000 = 0,157 mol → n(Fe) = 0,157 mol → m = <b>8,79 g Fe per 1000 L</b>'},
{s:3,q:'Een ingenieur ontwerpt een Mg-anode (M=24,3) voor pijpleidingbescherming met een corrosie-stroom van 1,0 A continue. (a) Bereken via Q=I·t en F=96485 C/mol welke massa Mg per jaar geoxideerd wordt (n=2). (b) Vergelijk met Zn (M=65,4; n=2). (c) Welk metaal heeft de laagste massa-verbruik per jaar bij dezelfde stroom?',
a:'(a) t = 365·24·3600 = 3,154×10<sup>7</sup> s; Q = 1·3,154×10<sup>7</sup> = 3,154×10<sup>7</sup> C; n(e<sup>−</sup>) = Q/F = 327 mol → n(Mg) = 327/2 = 163,5 mol → m = 163,5·24,3 = <b>3,97 kg Mg/jaar</b><br>(b) Zelfde n(e<sup>−</sup>) → n(Zn) = 163,5 mol → m = 163,5·65,4 = <b>10,7 kg Zn/jaar</b><br>(c) <b>Mg</b> — kleinste molaire massa per 2 e<sup>−</sup> uitgewisseld. Vandaar populair als verteringselektrode voor leidingen.'},
]},

{id:'4.3',t:'Normpotentiaal E⁰',sub:'E⁰-tabel · U_cel · spontaniteit',c1:true,
th:[
'E<sup>0</sup> = normpotentiaal t.o.v. standaardelektrode (SHE = 0,000 V; 25°C, 1 mol/L)',
'Hoe hoger E<sup>0</sup>, hoe sterker het oxidatiemiddel',
'U<sub>b</sub> = E<sup>0</sup>(kathode) − E<sup>0</sup>(anode) &nbsp;·&nbsp; U<sub>b</sub> > 0: spontaan; U<sub>b</sub> < 0: niet spontaan',
'Kathode = reductie = hogere E<sup>0</sup> &nbsp;·&nbsp; Anode = oxidatie = lagere E<sup>0</sup>',
'<b>Valkuil:</b> E<sup>0</sup> wordt NIET vermenigvuldigd bij coëfficiënten!',
],
fm:'U<sub>b</sub> = E<sup>0</sup>(kathode) − E<sup>0</sup>(anode)\nSpontaan: U<sub>b</sub> > 0\nKathode: hogere E<sup>0</sup>\nAnode: lagere E<sup>0</sup>',
exo:[
{s:1,q:'Een ingenieur ontwerpt een Ni-Cu galvanische cel (E<sup>0</sup>(Ni)=−0,23V; E<sup>0</sup>(Cu)=+0,34V). (a) Welk elektrode is kathode? (b) Bereken U<sub>b</sub>. (c) Welke massa Cu (M=63,5) wordt afgezet bij doorgang van 0,200 mol e<sup>−</sup>?',
a:'(a) Cu — hoogste E<sup>0</sup> → <b>kathode</b> (reductie)<br>(b) U<sub>b</sub> = 0,34 − (−0,23) = <b>+0,57V</b><br>(c) Cu<sup>2+</sup>+2e<sup>−</sup>→Cu → n(Cu) = 0,200/2 = 0,100 mol → m = 0,100·63,5 = <b>6,35 g</b>'},
{s:1,q:'Een Zn-Ag cel in een knoopcelbatterij produceert in de praktijk 1,50 V, theoretisch 1,56 V. (a) Welk metaal is kathode? (b) Bereken theoretisch U<sub>b</sub> bij normomstandigheden. (c) Verklaar waarom de werkelijke spanning lager kan zijn.',
a:'(a) Ag (E<sup>0</sup>=+0,80V) → <b>kathode</b>; Zn (−0,76V) → anode<br>(b) U<sub>b</sub> = 0,80 − (−0,76) = <b>+1,56V</b><br>(c) In een werkelijke cel zijn de ionconcentraties niet 1 mol/L (Nernst-correctie), interne weerstand verlaagt de spanning, en bij belasting treedt polarisatie op.'},
{s:1,q:'In een noodverlichtings-batterij gebruikt men Mg-Ag (E<sup>0</sup>(Mg)=−2,36V; E<sup>0</sup>(Ag)=+0,80V). (a) Welk poolteken heeft Mg? (b) Bereken U<sub>b</sub>. (c) Bereken theoretische capaciteit (in Ah) voor 5,0 g Mg (M=24,3; n=2; F=96485 C/mol).',
a:'(a) Mg = anode → <b>negatieve pool (−)</b><br>(b) U<sub>b</sub> = 0,80 − (−2,36) = <b>+3,16V</b><br>(c) n(Mg) = 5,0/24,3 = 0,206 mol → n(e<sup>−</sup>) = 0,411 mol → Q = 0,411·96485 = 39 660 C → <b>11,0 Ah</b>'},
{s:1,q:'Een Pb-Sn cel geeft een onverwacht zwak signaal (E<sup>0</sup>(Pb)=−0,13V; E<sup>0</sup>(Sn)=−0,14V). (a) Welk metaal is anode? (b) Bereken U<sub>b</sub>. (c) Verklaar waarom deze cel praktisch onbruikbaar is.',
a:'(a) Sn (laagste E<sup>0</sup> = −0,14V) → <b>anode</b>; Pb → kathode<br>(b) U<sub>b</sub> = −0,13 − (−0,14) = <b>+0,01V</b><br>(c) U<sub>b</sub> nauwelijks positief → kleine drijvende kracht → zeer trage reactie en grote gevoeligheid voor interne weerstand. Praktisch nul output.'},
{s:2,q:'In een Ag<sub>2</sub>O-Zn knoopcel (horloge) is E<sup>0</sup>(Ag<sub>2</sub>O/Ag)=+0,34V en E<sup>0</sup>(Zn(OH)<sub>2</sub>/Zn)=−1,25V in basisch milieu. (a) Bereken U<sub>b</sub>. (b) Welk poolteken heeft Zn? (c) Verklaar waarom E<sup>0</sup>(Zn(OH)<sub>2</sub>/Zn) verschilt van E<sup>0</sup>(Zn<sup>2+</sup>/Zn) = −0,76V.',
a:'(a) U<sub>b</sub> = 0,34 − (−1,25) = <b>+1,59V</b><br>(b) Zn = anode → <b>negatieve pool</b><br>(c) In basisch milieu vormt Zn niet Zn<sup>2+</sup> maar het slechtoplosbare Zn(OH)<sub>2</sub>. Verschillend OG-omringend systeem → andere halfreactie → andere E<sup>0</sup>. Algemeen: E<sup>0</sup> hangt af van de exacte halfreactie + omgeving (pH, complexering).'},
{s:2,q:'In een Cu-raffinage-cel (elektrolyse) is de aangelegde spanning slechts 0,3 V. (a) Schrijf beide halfreacties (zelfde redoxkoppel). (b) Wat is de theoretische U<sub>b</sub>? (c) Verklaar waar de extra 0,3V voor dient en wat er gebeurt met edele verontreinigingen zoals Au.',
a:'(a) Anode (ruw Cu): Cu → Cu<sup>2+</sup> + 2e<sup>−</sup>; Kathode (zuiver Cu): Cu<sup>2+</sup> + 2e<sup>−</sup> → Cu<br>(b) Beide halfcellen zelfde koppel → theoretisch U<sub>b</sub> = <b>0V</b><br>(c) De 0,3V compenseert IR-weerstand, kinetische overpotentiaal en concentratiepolarisatie. Au heeft te hoog E<sup>0</sup> (+1,50V) om bij deze spanning geoxideerd te worden → blijft als <b>anodemodder</b> onderaan (waardevol bijproduct).'},
{s:3,q:'Een ingenieur ontwerpt een Mg-Fe systeem voor kathodische bescherming van een ondergrondse Fe-pijpleiding, met continue corrosiestroom 50 mA. (a) Bereken U<sub>b</sub>. (b) Welke massa Mg (M=24,3) wordt verbruikt per jaar bij 50 mA continue? (c) Hoeveel kg Fe (M=55,8) wordt jaarlijks "gespaard" tegen oxidatie?',
a:'(a) U<sub>b</sub> = E<sup>0</sup>(Fe) − E<sup>0</sup>(Mg) = −0,44 − (−2,36) = <b>+1,92V</b><br>(b) t = 3,154×10<sup>7</sup> s; Q = 0,050·3,154×10<sup>7</sup> = 1,577×10<sup>6</sup> C; n(e<sup>−</sup>) = 16,35 mol → n(Mg) = 8,17 mol → m = <b>198 g Mg/jaar</b><br>(c) Zonder Mg zou Fe geoxideerd worden met dezelfde elektronenstroom: n(Fe) = 8,17 mol → m = 8,17·55,8 = <b>456 g Fe/jaar gespaard</b>. Wint dus 2,3× meer Fe-bescherming dan Mg-verbruik (in massa).'},
]},

{id:'4.4',t:'Galvanische cel',sub:'Anode− · kathode+ · zoutbrug · symbolische notatie',c1:false,
th:[
'Galvanische cel: chemische energie → elektrische energie (<b>vrijwillig</b>, ΔG < 0)',
'<b>Anode:</b> oxidatie, negatieve pool (−) — elektronen verlaten de cel via externe kring',
'<b>Kathode:</b> reductie, positieve pool (+) — elektronen komen de cel binnen',
'<b>Zoutbrug:</b> ionentransport om lading te compenseren; typisch KNO<sub>3</sub> of KCl in gelei',
'Symbolisch: anode | anode-opl. || kathode-opl. | kathode &nbsp;·&nbsp; links = anode, rechts = kathode',
],
fm:'Symbolisch: Zn|Zn<sup>2+</sup>(1M)||Cu<sup>2+</sup>(1M)|Cu\nAnode: oxidatie, −\nKathode: reductie, +',
exo:[
{s:1,q:'Een leerling bouwt een Daniell-cel met 1,0 M ZnSO<sub>4</sub> en 1,0 M CuSO<sub>4</sub>. (a) Schrijf de symbolische notatie. (b) Bereken theoretisch U<sub>b</sub>. (c) Welke massa Zn (M=65,4; n=2; F=96485) wordt verbruikt om 1,00 A gedurende 1 uur te leveren?',
a:'(a) <b>Zn | Zn<sup>2+</sup>(1M) || Cu<sup>2+</sup>(1M) | Cu</b> · anode links, kathode rechts, || = zoutbrug<br>(b) U<sub>b</sub> = 0,34 − (−0,76) = <b>+1,10V</b><br>(c) Q = I·t = 1,00·3600 = 3600 C → n(e<sup>−</sup>) = 3600/96485 = 0,0373 → n(Zn) = 0,01866 → m = <b>1,22 g</b>'},
{s:1,q:'Een alkaline batterij (Zn-anode, MnO<sub>2</sub>-kathode in KOH-elektrolyt) levert U<sub>b</sub>=1,50V. (a) Schrijf de halfreacties. (b) Hoeveel e<sup>−</sup> per mol Zn uitgewisseld? (c) Bereken theoretische capaciteit voor 5,0 g Zn (M=65,4).',
a:'(a) Anode: Zn → Zn<sup>2+</sup> + 2e<sup>−</sup>; Kathode: MnO<sub>2</sub> + H<sub>2</sub>O + e<sup>−</sup> → MnO(OH) + OH<sup>−</sup><br>(b) Per Zn: <b>2 e<sup>−</sup></b><br>(c) n(Zn) = 5,0/65,4 = 0,0764 mol → Q = 0,0764·2·96485 = 14 743 C = <b>4,10 Ah</b>'},
{s:1,q:'In een experiment vergelijk je drie galvanische cellen: Zn|Cu, Pb|Ag, Cu|Ag. (a) Welke combinatie geeft de grootste U<sub>b</sub>? Bereken. (b) Welke geeft de kleinste positieve U<sub>b</sub>? (c) Verklaar de samenhang met de spanningsreeks-positie.',
a:'(a) <b>Zn|Cu</b>: 0,34−(−0,76) = +1,10V. Pb|Ag: 0,80−(−0,13)=+0,93V. Cu|Ag: 0,80−0,34=+0,46V → <b>Zn|Cu = +1,10V</b><br>(b) <b>Cu|Ag = +0,46V</b><br>(c) Hoe groter de afstand tussen anode en kathode in de spanningsreeks, hoe groter U<sub>b</sub>. Cu en Ag liggen dicht bij elkaar.'},
{s:1,q:'Een leerling bouwt een Ni-Cu cel (E<sup>0</sup>(Ni)=−0,23V). (a) Schrijf halfreacties anode en kathode. (b) Welke richting bewegen de elektronen extern? (c) Welk metaal verteert en welk wordt aangeladen?',
a:'(a) Anode (Ni): Ni → Ni<sup>2+</sup> + 2e<sup>−</sup>; Kathode (Cu): Cu<sup>2+</sup> + 2e<sup>−</sup> → Cu<br>(b) Extern: Ni → Cu (van anode naar kathode)<br>(c) <b>Ni verteert</b> (Ni-atomen lossen op als Ni<sup>2+</sup>); <b>Cu wordt aangeladen</b> (Cu<sup>2+</sup> reduceert tot vast Cu op de elektrode).'},
{s:2,q:'Een H<sub>2</sub>/O<sub>2</sub>-brandstofcel werkt aan 1,23V (E<sup>0</sup>(O<sub>2</sub>/H<sub>2</sub>O)=+1,23V; E<sup>0</sup>(H<sup>+</sup>/H<sub>2</sub>)=0,00V). (a) Schrijf halfreacties (zuur milieu). (b) Bereken theoretische capaciteit (Ah/kg) voor zuiver H<sub>2</sub> (M=2,02). (c) Bereken energie-inhoud in MJ/kg en vergelijk met benzine (~46 MJ/kg).',
a:'(a) Anode: H<sub>2</sub> → 2H<sup>+</sup> + 2e<sup>−</sup>; Kathode: O<sub>2</sub> + 4H<sup>+</sup> + 4e<sup>−</sup> → 2H<sub>2</sub>O. Totaal: 2H<sub>2</sub>+O<sub>2</sub>→2H<sub>2</sub>O<br>(b) n(H<sub>2</sub>) = 1000/2,02 = 495 mol → Q = 495·2·96485 = 9,55×10<sup>7</sup> C = <b>26 530 Ah/kg</b><br>(c) E = Q·U = 9,55×10<sup>7</sup>·1,23 = 1,17×10<sup>8</sup> J = <b>117 MJ/kg</b> — 2,5× zoveel als benzine. Waarom dan niet alledaags? Opslag van H<sub>2</sub> is moeilijk (lage dichtheid, hoge druk).'},
{s:2,q:'In de medische sector wordt een Ag/AgCl referentie-elektrode gebruikt in ECG (halfreactie AgCl + e<sup>−</sup> ⇌ Ag + Cl<sup>−</sup>, E<sup>0</sup>=+0,22V). (a) Bereken U<sub>b</sub> als gekoppeld aan SHE. (b) Bereken U<sub>b</sub> als gekoppeld aan een Cu<sup>2+</sup>/Cu-halfcel. (c) Waarom geeft men praktisch deze elektrode de voorkeur boven SHE?',
a:'(a) U<sub>b</sub> = +0,22 − 0,00 = <b>+0,22V</b> (Ag/AgCl is kathode want hoger E<sup>0</sup>)<br>(b) U<sub>b</sub> = +0,34 − +0,22 = <b>+0,12V</b> (Cu is nu kathode)<br>(c) Geen gas (H<sub>2</sub>) nodig, geen Pt-elektrode in zuur, geen druk-instelling — gewoon een Ag-draadje in NaCl-oplossing. Stabieler en eenvoudiger.'},
{s:3,q:'Een corrosie-onderzoeker bestudeert "verzilvering" van Cu in zeewater met opgelost Ag<sup>+</sup> (10<sup>−5</sup> M). (a) Schrijf de spontane reactie. (b) Bereken U<sub>b</sub> bij normomstandigheden. (c) Gebruik Nernst (E = E<sup>0</sup> − (0,059/n)log Q) bij [Ag<sup>+</sup>]=10<sup>−5</sup>M, [Cu<sup>2+</sup>]=10<sup>−6</sup>M om de werkelijke spanning te berekenen. (d) Wat is de praktische conclusie?',
a:'(a) Cu + 2Ag<sup>+</sup> → Cu<sup>2+</sup> + 2Ag<br>(b) U<sub>b,0</sub> = 0,80 − 0,34 = <b>+0,46V</b><br>(c) Q = [Cu<sup>2+</sup>]/[Ag<sup>+</sup>]² = 10<sup>−6</sup>/(10<sup>−5</sup>)² = 10<sup>4</sup>. n=2 → E = 0,46 − (0,059/2)·log(10<sup>4</sup>) = 0,46 − 0,118 = <b>+0,34V</b><br>(d) Nog steeds spontaan: Cu wordt verzilverd in zeewater met Ag<sup>+</sup>-resten. Lagere concentraties verlagen de drijvende kracht maar keren ze niet om — Cu-onderdelen krijgen langzaam een Ag-laag.'},
]},

{id:'4.5',t:'Elektrolyse',sub:'Niet-vrijwillig · anode+ · kathode− · toepassingen',c1:false,
th:[
'Elektrolyse: elektrische energie → chemische energie (<b>niet-vrijwillig</b>, ΔG > 0)',
'Vereist externe spanningsbron; U<sub>ext</sub> > U<sub>b</sub>(cel)',
'<b>Anode:</b> oxidatie, positieve pool (+) — omgekeerd t.o.v. galvanische cel!',
'<b>Kathode:</b> reductie, negatieve pool (−)',
'Toepassingen: galvanisering, productie van Na, Cl<sub>2</sub>, Al, H<sub>2</sub>, O<sub>2</sub>',
],
fm:'Elektrolyse: U<sub>ext</sub> > U<sub>b</sub>(cel)\nAnode: oxidatie (+)\nKathode: reductie (−)',
exo:[
{s:1,q:'Bij elektrolyse van NaCl(aq) op industriële schaal (chloor-alkali proces). (a) Schrijf halfreacties aan kathode en anode. (b) Welk volume H<sub>2</sub>-gas (STP, 22,4 L/mol) ontstaat bij 1,0 A gedurende 1 uur? (c) Welke massa NaOH (M=40) wordt gevormd?',
a:'(a) Kathode (−): 2H<sub>2</sub>O + 2e<sup>−</sup> → H<sub>2</sub> + 2OH<sup>−</sup> · Anode (+): 2Cl<sup>−</sup> → Cl<sub>2</sub> + 2e<sup>−</sup><br>(b) Q = 3600 C → n(e<sup>−</sup>) = 0,0373 mol → n(H<sub>2</sub>) = 0,01866 mol → V = <b>0,418 L H<sub>2</sub></b><br>(c) n(OH<sup>−</sup>) = 0,0373 mol → n(NaOH) = 0,0373 mol → m = <b>1,49 g NaOH</b>'},
{s:1,q:'Bij verchroming van een autobumper wordt 0,500 mol Cr<sup>3+</sup> afgezet in 30,0 min. M(Cr)=52; n(e<sup>−</sup>)=3 per Cr. (a) Bereken n(e<sup>−</sup>) en stroom I. (b) Bereken massa Cr afgezet. (c) Welk volume Cl<sub>2</sub>-gas ontstaat aan de anode bij STP?',
a:'(a) n(e<sup>−</sup>) = 0,500·3 = 1,50 mol → Q = 1,50·96485 = 144 728 C → I = Q/t = 144 728/1800 = <b>80,4 A</b><br>(b) m(Cr) = 0,500·52 = <b>26,0 g</b><br>(c) 2Cl<sup>−</sup>→Cl<sub>2</sub>+2e<sup>−</sup>: n(Cl<sub>2</sub>) = 1,50/2 = 0,750 mol → V = 0,750·22,4 = <b>16,8 L Cl<sub>2</sub></b>'},
{s:1,q:'In de industriële Al-productie (Hall-Héroult, smeltelektrolyse van Al<sub>2</sub>O<sub>3</sub>): 5,0 V en 50 000 A. (a) Schrijf halfreacties. (b) Bereken kg Al geproduceerd per dag (M=27; n=3; F=96485). (c) Welk minimum spanning is theoretisch nodig (overpotentiaal verwaarloosd)?',
a:'(a) Kathode: Al<sup>3+</sup> + 3e<sup>−</sup> → Al · Anode: 2O<sup>2−</sup> → O<sub>2</sub> + 4e<sup>−</sup><br>(b) Q = 50000·86400 = 4,32×10<sup>9</sup> C → n(e<sup>−</sup>) = 44 770 mol → n(Al) = 14 923 mol → m = <b>403 kg Al/dag</b><br>(c) Theoretisch min ≈ <b>1,2V</b> (uit thermodynamische ΔG). Praktisch 5V vereist door overpotentiaal en interne weerstand → het meeste energie gaat als warmte verloren.'},
{s:1,q:'In een leerlingenproef met elektrolyse van 0,5 M CuSO<sub>4</sub> en Pt-elektroden. (a) Schrijf halfreacties: kies tussen Cu<sup>2+</sup> of H<sub>2</sub>O aan kathode, en tussen SO<sub>4</sub><sup>2−</sup> of H<sub>2</sub>O aan anode (verklaar). (b) Bereken massa Cu afgezet bij 0,500 A gedurende 20 min. (c) Wat zou er aan de anode anders zijn bij gebruik van Cu-elektroden?',
a:'(a) Kathode: <b>Cu<sup>2+</sup> + 2e<sup>−</sup> → Cu</b> (Cu<sup>2+</sup> heeft veel hoger E<sup>0</sup> dan H<sub>2</sub>O → Cu wint). Anode: <b>2H<sub>2</sub>O → O<sub>2</sub> + 4H<sup>+</sup> + 4e<sup>−</sup></b> (SO<sub>4</sub><sup>2−</sup> heeft te hoog E<sup>0</sup> voor oxidatie → H<sub>2</sub>O wordt geoxideerd).<br>(b) Q = 0,500·1200 = 600 C → n(e<sup>−</sup>) = 6,22×10<sup>−3</sup> → n(Cu) = 3,11×10<sup>−3</sup> → m = <b>0,197 g Cu</b><br>(c) Met Cu-elektroden: anode wordt zelf geoxideerd (Cu→Cu<sup>2+</sup>+2e<sup>−</sup>) i.p.v. water → geen O<sub>2</sub>-vorming, maar Cu-raffinage.'},
{s:2,q:'In de productie van Na uit gesmolten NaCl (Downs-cel). (a) Schrijf halfreacties aan kathode en anode. (b) Bereken minimumspanning (E<sup>0</sup>(Na<sup>+</sup>/Na)=−2,71V; E<sup>0</sup>(Cl<sub>2</sub>/Cl<sup>−</sup>)=+1,36V). (c) Verklaar waarom in waterige oplossing géén metallisch Na ontstaat.',
a:'(a) Kathode (−): Na<sup>+</sup> + e<sup>−</sup> → Na · Anode (+): 2Cl<sup>−</sup> → Cl<sub>2</sub> + 2e<sup>−</sup><br>(b) U<sub>min</sub> = E<sup>0</sup>(anode) − E<sup>0</sup>(kathode) = 1,36 − (−2,71) = <b>+4,07V</b> externe spanning vereist<br>(c) In water is E<sup>0</sup>(H<sub>2</sub>O/H<sub>2</sub>) = −0,83V veel hoger dan E<sup>0</sup>(Na<sup>+</sup>/Na) = −2,71V → H<sub>2</sub>O wordt eerst gereduceerd → H<sub>2</sub>-gas i.p.v. Na-metaal. Smeltelektrolyse is dus de enige industriële route.'},
{s:2,q:'In industriële Cu-raffinage (anode = ruw Cu, kathode = zuiver Cu, CuSO<sub>4</sub>-elektrolyt). (a) Schrijf de halfreacties. (b) Waar komen verontreinigingen zoals Au, Ag, Pt terecht? Verklaar. (c) Bij 5000 A gedurende 24 uur: hoeveel kg Cu (M=63,5; n=2) geproduceerd?',
a:'(a) Anode: Cu → Cu<sup>2+</sup> + 2e<sup>−</sup> · Kathode: Cu<sup>2+</sup> + 2e<sup>−</sup> → Cu<br>(b) Edele metalen (Au E<sup>0</sup>=+1,50V; Ag +0,80V; Pt +1,19V) hebben veel hoger E<sup>0</sup> dan Cu (+0,34V) → worden NIET geoxideerd bij de lage celspanning → blijven achter als <b>"anodemodder"</b> onderaan de cel (waardevol bijproduct).<br>(c) Q = 5000·86400 = 4,32×10<sup>8</sup> C → n(e<sup>−</sup>) = 4477 mol → n(Cu) = 2239 mol → m = <b>142 kg Cu</b>'},
{s:3,q:'Een leerling onderzoekt elektrolyse van een 0,10 M NaCl + 0,10 M NaI mengsel met Pt-elektroden (E<sup>0</sup>(I<sub>2</sub>/I<sup>−</sup>)=+0,54V; E<sup>0</sup>(Cl<sub>2</sub>/Cl<sup>−</sup>)=+1,36V; E<sup>0</sup>(O<sub>2</sub>/H<sub>2</sub>O)=+1,23V). (a) Welk anion oxideert eerst aan de anode? (b) Welke producten ontstaan tijdens de elektrolyse, en in welke volgorde? (c) Welk product aan de kathode?',
a:'(a) Anode oxideert sterkste reductor → laagste E<sup>0</sup> voor oxidatie: <b>I<sup>−</sup></b> (E<sup>0</sup>=+0,54V) oxideert eerst → I<sub>2</sub><br>(b) Eerst: I<sub>2</sub>-vorming (oplossing wordt bruin). Na uitputting I<sup>−</sup>: het volgende deeltje E<sup>0</sup> is H<sub>2</sub>O (+1,23V), maar in praktijk wint Cl<sup>−</sup> (+1,36V) wel eens door lagere overpotentiaal van Cl<sub>2</sub> dan O<sub>2</sub>. Dus volgorde: <b>I<sub>2</sub> → Cl<sub>2</sub></b>.<br>(c) Kathode: Na<sup>+</sup> heeft E<sup>0</sup>=−2,71V (onbereikbaar) → <b>H<sub>2</sub>O gereduceerd → H<sub>2</sub> + OH<sup>−</sup></b>.'},
]},

{id:'4.6',t:'Redoxreacties opstellen',sub:'Halfreactiemethode · zuur/basisch milieu',c1:true,
th:[
'Halfreactiemethode: schrijf oxidatie en reductie apart op',
'Zuur milieu: H<sub>2</sub>O voor O-atomen, H<sup>+</sup> voor H-atomen',
'Balanceer lading met elektronen (e<sup>−</sup>)',
'Vermenigvuldig halfreacties zodat aantal e<sup>−</sup> gelijk is; tel op; vereenvoudig',
'<b>Stappen:</b> ① atomen ② lading met e<sup>−</sup> ③ e<sup>−</sup> gelijkstellen ④ optellen',
],
fm:'Stappen:\n① balanceer atomen (H₂O voor O; H⁺ voor H)\n② balanceer lading met e⁻\n③ gelijkstellen e⁻ (× factor)\n④ optellen + vereenvoudigen',
exo:[
{s:1,q:'Bij analyse van Fe<sup>2+</sup> in een leerlingstaal wordt KMnO<sub>4</sub> gebruikt in zuur milieu. Fe<sup>2+</sup> wordt geoxideerd; MnO<sub>4</sub><sup>−</sup> tot Mn<sup>2+</sup>. (a) Schrijf beide gebalanceerde halfreacties. (b) Schrijf de totale ionvergelijking. (c) Voor 25,0 mL 0,020 M KMnO<sub>4</sub>-verbruik: bereken n(Fe<sup>2+</sup>) getitreerd.',
a:'(a) Reductie: <b>MnO<sub>4</sub><sup>−</sup> + 8H<sup>+</sup> + 5e<sup>−</sup> → Mn<sup>2+</sup> + 4H<sub>2</sub>O</b><br>Oxidatie: <b>Fe<sup>2+</sup> → Fe<sup>3+</sup> + e<sup>−</sup></b> (×5)<br>(b) MnO<sub>4</sub><sup>−</sup> + 5Fe<sup>2+</sup> + 8H<sup>+</sup> → Mn<sup>2+</sup> + 5Fe<sup>3+</sup> + 4H<sub>2</sub>O<br>(c) n(KMnO<sub>4</sub>) = 0,020·0,0250 = 5,0×10<sup>−4</sup> mol → n(Fe<sup>2+</sup>) = 5·5,0×10<sup>−4</sup> = <b>2,5×10<sup>−3</sup> mol</b>'},
{s:1,q:'In een chloraat-jodide titratie wordt KI met KClO<sub>3</sub> in zuur milieu omgezet: I<sup>−</sup> + ClO<sub>3</sub><sup>−</sup> → I<sub>2</sub> + Cl<sup>−</sup>. (a) Schrijf gebalanceerde halfreacties. (b) Schrijf de totale ionvergelijking. (c) Bij 0,120 mol KI in een mengsel: hoeveel mol KClO<sub>3</sub> nodig?',
a:'(a) Red: <b>ClO<sub>3</sub><sup>−</sup> + 6H<sup>+</sup> + 6e<sup>−</sup> → Cl<sup>−</sup> + 3H<sub>2</sub>O</b> · Ox: <b>2I<sup>−</sup> → I<sub>2</sub> + 2e<sup>−</sup></b> (×3)<br>(b) ClO<sub>3</sub><sup>−</sup> + 6I<sup>−</sup> + 6H<sup>+</sup> → Cl<sup>−</sup> + 3I<sub>2</sub> + 3H<sub>2</sub>O<br>(c) Verhouding 6 I<sup>−</sup> : 1 ClO<sub>3</sub><sup>−</sup> → n(KClO<sub>3</sub>) = 0,120/6 = <b>0,020 mol</b>'},
{s:1,q:'Voor analyse van H<sub>2</sub>O<sub>2</sub>-gehalte (peroxide-bleekwater) wordt KMnO<sub>4</sub> gebruikt in zuur milieu (H<sub>2</sub>O<sub>2</sub> als reductor). (a) Schrijf de gebalanceerde totaalreactie. (b) Bereken n(H<sub>2</sub>O<sub>2</sub>) bij verbruik van 30,0 mL 0,0200 M KMnO<sub>4</sub>. (c) Welke massa H<sub>2</sub>O<sub>2</sub> komt overeen (M=34,0)?',
a:'(a) <b>2MnO<sub>4</sub><sup>−</sup> + 5H<sub>2</sub>O<sub>2</sub> + 6H<sup>+</sup> → 2Mn<sup>2+</sup> + 5O<sub>2</sub> + 8H<sub>2</sub>O</b><br>(b) n(KMnO<sub>4</sub>) = 6,0×10<sup>−4</sup> mol → n(H<sub>2</sub>O<sub>2</sub>) = 5/2·6,0×10<sup>−4</sup> = <b>1,5×10<sup>−3</sup> mol</b><br>(c) m = 1,5×10<sup>−3</sup>·34,0 = <b>0,051 g H<sub>2</sub>O<sub>2</sub></b>'},
{s:1,q:'Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup> (oranje) wordt door SO<sub>2</sub> gereduceerd in zuur milieu — toegepast voor SO<sub>2</sub>-detectie in industriële uitstoot. (a) Schrijf beide gebalanceerde halfreacties. (b) Schrijf totale reactie. (c) Bij 0,010 mol Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup>: bereken n(SO<sub>2</sub>) nodig.',
a:'(a) Red: <b>Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup> + 14H<sup>+</sup> + 6e<sup>−</sup> → 2Cr<sup>3+</sup> + 7H<sub>2</sub>O</b> · Ox: <b>SO<sub>2</sub> + 2H<sub>2</sub>O → SO<sub>4</sub><sup>2−</sup> + 4H<sup>+</sup> + 2e<sup>−</sup></b> (×3)<br>(b) Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup> + 3SO<sub>2</sub> + 2H<sup>+</sup> → 2Cr<sup>3+</sup> + 3SO<sub>4</sub><sup>2−</sup> + H<sub>2</sub>O<br>(c) n(SO<sub>2</sub>) = 3·0,010 = <b>0,030 mol</b>. Bonus: oranje Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup> → groen Cr<sup>3+</sup> dient als visuele indicator.'},
{s:2,q:'Bleekwater (NaClO) reageert met KI in zuur milieu, wat kan worden gebruikt om "bleekkracht" kwantitatief te meten. (a) Schrijf de gebalanceerde totaalreactie. (b) Bij 100 mL bleekwater 0,10 M NaClO: welk volume 0,10 M KI nodig? (c) Welk volume I<sub>2</sub>-oplossing krijg je theoretisch?',
a:'(a) Red: ClO<sup>−</sup> + 2H<sup>+</sup> + 2e<sup>−</sup> → Cl<sup>−</sup> + H<sub>2</sub>O · Ox: 2I<sup>−</sup> → I<sub>2</sub> + 2e<sup>−</sup><br>Totaal: <b>ClO<sup>−</sup> + 2I<sup>−</sup> + 2H<sup>+</sup> → Cl<sup>−</sup> + I<sub>2</sub> + H<sub>2</sub>O</b><br>(b) n(NaClO) = 0,010 mol → n(I<sup>−</sup>) = 0,020 mol → V(KI) = 0,020/0,10 = <b>200 mL</b><br>(c) n(I<sub>2</sub>) = 0,010 mol — meetbaar via thiosulfaattitratie (Na<sub>2</sub>S<sub>2</sub>O<sub>3</sub>).'},
{s:2,q:'In basisch milieu reageert MnO<sub>4</sub><sup>−</sup> met I<sup>−</sup> tot MnO<sub>2</sub> en IO<sub>3</sub><sup>−</sup>. (a) Schrijf beide gebalanceerde halfreacties (basisch milieu, gebruik OH<sup>−</sup>). (b) Schrijf de totaalreactie. (c) Voor 1,0 mmol MnO<sub>4</sub><sup>−</sup>: hoeveel n(I<sup>−</sup>) nodig?',
a:'(a) Red: <b>MnO<sub>4</sub><sup>−</sup> + 2H<sub>2</sub>O + 3e<sup>−</sup> → MnO<sub>2</sub> + 4OH<sup>−</sup></b> (×2)<br>Ox: <b>I<sup>−</sup> + 6OH<sup>−</sup> → IO<sub>3</sub><sup>−</sup> + 3H<sub>2</sub>O + 6e<sup>−</sup></b> (×1)<br>(b) <b>2MnO<sub>4</sub><sup>−</sup> + I<sup>−</sup> + H<sub>2</sub>O → 2MnO<sub>2</sub> + IO<sub>3</sub><sup>−</sup> + 2OH<sup>−</sup></b><br>(c) Per 2 mol MnO<sub>4</sub><sup>−</sup>: 1 mol I<sup>−</sup>. Voor 1,0 mmol MnO<sub>4</sub><sup>−</sup>: n(I<sup>−</sup>) = <b>0,50 mmol</b>'},
{s:3,q:'Bij afvalwaterzuivering wordt toxisch Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup> onschadelijk gemaakt door reductie met Fe<sup>2+</sup> in zuur milieu (daarna pH-correctie precipiteert Cr(OH)<sub>3</sub>). (a) Schrijf de gebalanceerde redox-totaalreactie. (b) Bereken n(Fe<sup>2+</sup>) nodig per mol Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup>. (c) Voor 1,0 kg afvalwater met 1,0% Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup> (M=216): hoeveel kg FeSO<sub>4</sub>·7H<sub>2</sub>O (M=278) nodig?',
a:'(a) Red: Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup>+14H<sup>+</sup>+6e<sup>−</sup>→2Cr<sup>3+</sup>+7H<sub>2</sub>O · Ox: Fe<sup>2+</sup>→Fe<sup>3+</sup>+e<sup>−</sup> (×6)<br>Totaal: <b>Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup> + 6Fe<sup>2+</sup> + 14H<sup>+</sup> → 2Cr<sup>3+</sup> + 6Fe<sup>3+</sup> + 7H<sub>2</sub>O</b><br>(b) <b>6 mol Fe<sup>2+</sup> per mol Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup></b><br>(c) m(Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup>) = 0,010 kg = 10 g → n = 10/216 = 0,0463 mol → n(Fe<sup>2+</sup>) = 6·0,0463 = 0,278 mol → m(FeSO<sub>4</sub>·7H<sub>2</sub>O) = 0,278·278 = <b>77,2 g per kg afvalwater</b>'},
]},
],
};

// ── EXTENDED THEORY (paragrafen) ──────────────────────────────────────────────
const TH_EXT = {
'3.1':'De zuur-baseleer kreeg in 1884 een wetenschappelijk fundament door Svante Arrhenius. Zuren en basen werden herkend aan wat zij in water afgeven: zuren leveren H<sup>+</sup>-ionen, basen leveren OH<sup>−</sup>-ionen. De theorie verklaart elegant waarom zoutzuur en zwavelzuur elektrische geleiding vertonen, en waarom natronloog bijtend is. De definitie struikelt echter bij ammoniak (NH<sub>3</sub>): er is geen OH-groep aanwezig en toch verkleurt rood lakmoes blauw. Daarom verfijnen we de definitie verderop met Brønsted-Lowry.',
'3.2':'In 1923 herzagen Brønsted en Lowry, onafhankelijk van elkaar, de definitie. Zuren zijn protondonoren, basen protonacceptoren. De aandacht verschuift van het oplosmiddel naar de protonoverdracht zelf, wat reacties buiten water mogelijk maakt. Elk zuur heeft zijn geconjugeerde base (één proton minder); elke base haar geconjugeerd zuur (één proton meer). Het evenwicht ligt altijd aan de zwakste kant van het paar.',
'3.3':'De evenwichtsconstante K<sub>z</sub> meet hoeveel een zuur ioniseert in water: hoe groter K<sub>z</sub>, hoe sterker het zuur. Praktisch werkt men met pK<sub>z</sub> = −log K<sub>z</sub>, omdat de waarden over vele grootteorden lopen. Een vingerregel die altijd geldt: een sterk zuur geeft een zwakke geconjugeerde base — wat HCl makkelijk afstaat, neemt Cl<sup>−</sup> niet terug op. De gelijkheid K<sub>z</sub>·K<sub>b</sub> = K<sub>w</sub> drukt deze koppeling kwantitatief uit.',
'3.4':'Water is geen passieve toeschouwer. Het ioniseert zelf in zeer kleine mate (2H<sub>2</sub>O ⇌ H<sub>3</sub>O<sup>+</sup> + OH<sup>−</sup>). Bij 25°C is het product van beide concentraties exact 10<sup>−14</sup> — dat is K<sub>w</sub>. De pH-schaal comprimeert [H<sub>3</sub>O<sup>+</sup>] logaritmisch: één eenheid verschil komt overeen met factor 10 in concentratie. Belangrijk: K<sub>w</sub> stijgt met de temperatuur; puur water bij 60°C heeft pH ≈ 6,5 maar blijft neutraal.',
'3.5':'Bij elke pH-berekening is de eerste vraag: sterk of zwak? Sterke zuren ioniseren volledig, dus [H<sub>3</sub>O<sup>+</sup>] = c. Voor zwakke zuren geldt — als de ionisatie klein is (α < 5%) — de benadering [H<sub>3</sub>O<sup>+</sup>] = √(K<sub>z</sub>·c). Bij grote verdunning of zeer zwakke zuren breekt deze benadering, en moet de volle vierkantsvergelijking opgelost worden. Een goede reflex: na elke berekening α controleren.',
'3.6':'De titratie is een van de oudste analytische technieken: stapsgewijs een gekende oplossing toevoegen tot het stoichiometrisch punt bereikt is. Bij sterk zuur + sterke base ligt het equivalentiepunt bij pH = 7; bij zwak zuur + sterke base verschuift het naar pH > 7 omdat de geconjugeerde base hydrolyseert. De keuze van de indicator is dus niet willekeurig — zij moet omslaan binnen de pH-sprong rond het equivalentiepunt.',
'3.7':'Een buffer is een chemisch geheugen voor zuurgraad. Hij weerstaat pH-veranderingen, ten minste tot zijn capaciteit uitgeput is. Het werkingsprincipe rust op een evenwicht tussen een zwak zuur en zijn geconjugeerde base, die toegevoegd zuur of base kunnen neutraliseren zonder dat [H<sub>3</sub>O<sup>+</sup>] sterk verschuift. De Henderson-Hasselbalch-vergelijking voorspelt de pH uit de verhouding base/zuur. Het bloedbuffer (HCO<sub>3</sub><sup>−</sup>/CO<sub>2</sub>) houdt onze pH binnen 0,05 eenheden van 7,40.',
'4.1':'Het oxidatiegetal is een boekhoudkundige fictie: we doen alsof alle bindingen ionisch zijn en kennen elke atoom de fictieve lading toe die dat zou opleveren. Het systeem laat ons elektronenoverdracht volgen, zelfs wanneer er geen duidelijke ionen ontstaan. De regels lopen via vaste afspraken (O = −2, H = +1, ΣOG = 0 of lading), met enkele uitzonderingen voor peroxide en metaalhydride. Het ezelsbruggetje OIL RIG houdt de richting helder.',
'4.2':'De spanningsreeks ordent metalen volgens hun neiging om elektronen af te staan. Mg staat bovenaan als sterkste reductor; Au onderaan als zwakste. De diagonaalregel — oxidans boven reductor in de tabel betekent spontane reactie — is een snel hulpmiddel dat rust op de thermodynamica: ΔG < 0 als U<sub>b</sub> > 0. Historisch verklaart de reeks waarom ijzer roest in contact met koper (galvanische corrosie) en waarom edele metalen zo zeldzaam in verbinding voorkomen.',
'4.3':'De normpotentiaal E<sup>0</sup> kwantificeert wat de spanningsreeks kwalitatief uitdrukt: hoe sterk een halfreactie elektronen wil opnemen, gemeten tegen de standaardwaterstofelektrode (SHE = 0,000 V). Bij standaardomstandigheden (25°C, 1 mol/L) is E<sup>0</sup> een tabelwaarde; in een werkelijke cel verandert de potentiaal volgens de Nernst-vergelijking. Let op: E<sup>0</sup> is een intensieve grootheid en mag NIET vermenigvuldigd worden met stoichiometrische coëfficiënten.',
'4.4':'Alessandro Volta bouwde in 1800 de eerste galvanische cel — de zuil van Volta — door schijfjes Zn en Cu te stapelen met vochtig vilt ertussen. Wat hij gerealiseerd had, was een directe omzetting van chemische in elektrische energie. Modern: twee halfcellen, één met oxidatie (anode, −), één met reductie (kathode, +), verbonden via een externe draad voor elektronen en een zoutbrug voor ionen. De zoutbrug is essentieel: zonder ionentransport legt de ladingscheiding de reactie onmiddellijk stil.',
'4.5':'Elektrolyse is de spiegelbeeldige zus van de galvanische cel: een externe spanningsbron dwingt een niet-spontane reactie door. De pooltekens keren om — anode = (+), kathode = (−) — omdat de externe bron de elektronenstroom oplegt. Industrieel onmisbaar: productie van aluminium uit Al<sub>2</sub>O<sub>3</sub>, van chloor en NaOH uit pekel, van waterstof uit water. Bij waterige oplossingen concurreert water met de opgeloste ionen: voor metallisch Na heb je gesmolten NaCl nodig, niet zoutwater.',
'4.6':'Het balanceren van redoxreacties dwingt twee evenwichten af: de massabalans (atomen) én de ladingsbalans (elektronen). De halfreactiemethode splitst eerst de reactie in oxidatie en reductie, balanceert beide apart, en stelt het aantal e<sup>−</sup> gelijk vóór de samenvoeging. In zuur milieu vult H<sub>2</sub>O de O-atomen aan en H<sup>+</sup> de H-atomen; in basisch milieu komen OH<sup>−</sup>-ionen in het spel. Een gebalanceerde redoxvergelijking bevat geen losse e<sup>−</sup> meer.',
};

// ── STAPPENPLANNEN ────────────────────────────────────────────────────────────
const STEPS = {
'3.1':['Identificeer of de stof zuur (geeft H<sup>+</sup>) of base (geeft OH<sup>−</sup>) is.','Bepaal sterk of zwak — kies de juiste pijl (→ of ⇌).','Bij meerwaardige zuren: schrijf elke ionisatiestap apart.'],
'3.2':['Spot de protondonor (zuur) en de protonacceptor (base) in de reactie.','Vorm de geconjugeerde paren: zuur − H<sup>+</sup> = geconj. base.','Markeer beide paren in de evenwichtsvergelijking.'],
'3.3':['Noteer de evenwichtsuitdrukking voor K<sub>z</sub> of K<sub>b</sub>.','Vul concentraties in vanuit een ICE-tabel indien nodig.','Vergelijk pK<sub>z</sub>-waarden voor de sterktevolgorde — kleiner pK<sub>z</sub> = sterker.'],
'3.4':['Identificeer wat gegeven is: [H<sub>3</sub>O<sup>+</sup>], [OH<sup>−</sup>], pH of pOH.','Gebruik K<sub>w</sub> = 10<sup>−14</sup> om tussen [H<sub>3</sub>O<sup>+</sup>] en [OH<sup>−</sup>] om te zetten.','Pas pH + pOH = 14 toe voor de complementaire schaal; controleer zuur/basisch.'],
'3.5':['Klassificeer: sterk of zwak zuur/base.','Pas de juiste formule toe — sterk: pH = −log(c); zwak: [H<sub>3</sub>O<sup>+</sup>] = √(K<sub>z</sub>·c).','Verifieer ionisatiegraad α = [H<sub>3</sub>O<sup>+</sup>]/c × 100% < 5%.'],
'3.6':['Schrijf de valentiewet: n<sub>z</sub>·c<sub>z</sub>·V<sub>z</sub> = n<sub>b</sub>·c<sub>b</sub>·V<sub>b</sub>.','Vul de gekende waarden in — let op de valentie n.','Los algebraïsch op naar de onbekende; kies een passende indicator.'],
'3.7':['Identificeer het zwak zuur HA en de geconjugeerde base A<sup>−</sup>.','Pas Henderson-Hasselbalch toe: pH = pK<sub>z</sub> + log([A<sup>−</sup>]/[HA]).','Bij toevoeging: pas n-waarden eerst aan, dan opnieuw berekenen.'],
'4.1':['Pas de standaardregels toe: O = −2, H = +1, vrij element = 0.','Stel ΣOG = 0 voor moleculen, ΣOG = lading voor ionen.','Los algebraïsch op naar het onbekende OG.'],
'4.2':['Zoek beide E<sup>0</sup>-waarden op in de spanningsreeks.','Pas de diagonaalregel toe: oxidans boven reductor → spontaan.','Bereken U<sub>b</sub> = E<sup>0</sup>(kathode) − E<sup>0</sup>(anode); > 0 bevestigt spontaniteit.'],
'4.3':['Identificeer de kathode (hoogste E<sup>0</sup>, reductie) en anode (laagste E<sup>0</sup>, oxidatie).','Schrijf de halfreacties — vermenigvuldig E<sup>0</sup> NIET met coëfficiënten.','U<sub>b</sub> = E<sup>0</sup>(kathode) − E<sup>0</sup>(anode); teken bepaalt spontaniteit.'],
'4.4':['Wijs anode (lagere E<sup>0</sup>, oxidatie, −) en kathode (hogere E<sup>0</sup>, reductie, +) aan.','Schrijf beide halfreacties en vermenigvuldig zodat e<sup>−</sup> gelijk zijn.','Symbolische notatie: anode | anode-opl. || kathode-opl. | kathode.'],
'4.5':['Bevestig dat de reactie niet-vrijwillig is — U<sub>ext</sub> > U<sub>b</sub>(cel).','Keer de pooltekens om: anode = (+), kathode = (−).','Bij waterige oplossing: controleer welke deeltjes water verslaan in elektrolyse.'],
'4.6':['Splits de reactie in oxidatie- en reductiehalfreactie.','Balanceer atomen — gebruik H<sub>2</sub>O en H<sup>+</sup> (zuur) of OH<sup>−</sup> (basisch).','Balanceer lading met e<sup>−</sup>, stel e<sup>−</sup> gelijk, tel halfreacties op.'],
};

// ── EXPANDED THEORY BULLETS (course-aligned) ──────────────────────────────────
const TH_BULLETS = {
'3.1':[
'<b>Historisch:</b> een zuur werd herkend aan zure smaak, het kleuren van lakmoes naar rood, het bruisen met marmer en het oplossen van onedele metalen (ijzer, zink). Een base aan een zeepachtige bittere smaak en het kleuren van lakmoes naar blauw.',
'<b>Svante Arrhenius (1884):</b> een zuur is een stof die in waterig milieu <b>ioniseert</b> tot H<sup>+</sup>-ionen en zuurrestionen — schema HZ → H<sup>+</sup> + Z<sup>−</sup>. Voorbeelden: HCl, H<sub>2</sub>SO<sub>4</sub>, HNO<sub>3</sub>.',
'Zuren zijn sterk polaire stoffen met atoombinding; in een polair oplosmiddel (water) polariseren ze tot vrije <b>gehydrateerde</b> ionen. Dit proces noemen we ionisatie.',
'Het zuurkarakter is te wijten aan vrije H<sup>+</sup>-ionen. In werkelijkheid bindt elk proton zich onmiddellijk aan een watermolecule tot het <b>oxoniumion</b> H<sub>3</sub>O<sup>+</sup> (overgang naar Brønsted-Lowry).',
'Een Arrhenius-base = metaalhydroxide: MOH → M<sup>+</sup> + OH<sup>−</sup>. Voorbeelden: NaOH, KOH, Ca(OH)<sub>2</sub>. Hier spreekt men van <b>dissociatie</b>, want de ionen zaten al in het kristalrooster.',
'Het basekarakter is te wijten aan vrije OH<sup>−</sup>-ionen. Tweewaardige basen (Ca(OH)<sub>2</sub>) en driewaardige basen (Al(OH)<sub>3</sub>) leveren meerdere OH<sup>−</sup> per formule-eenheid.',
'<b>Sterke</b> zuren/basen ioniseren <b>volledig</b> (→ aflopende reactie); <b>zwakke</b> slechts gedeeltelijk (⇌ evenwicht).',
'<b>Beperking van Arrhenius:</b> de theorie geldt enkel in waterig milieu. NH<sub>3</sub> is duidelijk een base maar bezit geen OH-groep — onverklaarbaar binnen dit kader. Sommige zouten geven zure of basische oplossingen, hoewel zouten in Arrhenius-zin neutraal zouden moeten zijn.',
'<b>Indicatoren</b> bij Arrhenius: lakmoes (rood/blauw), fenolftaleïne (kleurloos/fuchsia), methyloranje (rood/geel), broomthymolblauw (geel/blauw).',
],
'3.2':[
'<b>Brønsted & Lowry (1923)</b> formuleerden onafhankelijk van elkaar een ruimere theorie dan Arrhenius. Centraal staat de <b>protonoverdracht</b> tussen twee deeltjes, niet meer de ionvorming in water.',
'<b>Brønsted-zuur</b> = protondonor — elk deeltje met een H-atoom dat als H<sup>+</sup> kan worden losgelaten. Moleculen (HCl, H<sub>2</sub>O, CH<sub>3</sub>COOH), positieve ionen (NH<sub>4</sub><sup>+</sup>, [Al(H<sub>2</sub>O)<sub>6</sub>]<sup>3+</sup>) of negatieve ionen (HSO<sub>4</sub><sup>−</sup>) kunnen optreden.',
'<b>Brønsted-base</b> = protonacceptor — elk deeltje met een <b>vrij elektronenpaar</b> waarin een proton ingebouwd kan worden. Voorbeelden: NH<sub>3</sub>, H<sub>2</sub>O, OH<sup>−</sup>, CO<sub>3</sub><sup>2−</sup>, O<sup>2−</sup>.',
'<b>Geconjugeerd paar:</b> een zuur en zijn geconjugeerde base verschillen <i>slechts</i> met één proton. Zuur − H<sup>+</sup> = geconjugeerde base; base + H<sup>+</sup> = geconjugeerd zuur.',
'<b>Amfolyt</b> (= amfoteer deeltje): kan zowel proton afstaan als opnemen, naargelang de reactiepartner. Klassieke voorbeelden: H<sub>2</sub>O, HCO<sub>3</sub><sup>−</sup>, H<sub>2</sub>PO<sub>4</sub><sup>−</sup>, HSO<sub>4</sub><sup>−</sup>.',
'<b>Protolysereactie</b> = uitwisseling van een proton tussen twee deeltjes. Een zuur kan slechts als zuur fungeren in <i>aanwezigheid</i> van een base — zuur-base bestaat niet op zichzelf.',
'In elke protolysereactie zijn <b>twee geconjugeerde paren</b> betrokken: Zuur<sub>1</sub> + Base<sub>2</sub> ⇌ Base<sub>1</sub> + Zuur<sub>2</sub>.',
'In water: H<sub>2</sub>O treedt op als base (vormt H<sub>3</sub>O<sup>+</sup>) of als zuur (vormt OH<sup>−</sup>) — de <b>amfolyt-natuur</b> van water is fundamenteel.',
'<b>Evenwichtsligging:</b> de reactie verloopt steeds in de richting van het zwakste zuur en de zwakste base.',
],
'3.3':[
'<b>Autoprotolyse van water:</b> tussen twee watermoleculen vindt spontaan protonoverdracht plaats — 2 H<sub>2</sub>O ⇌ H<sub>3</sub>O<sup>+</sup> + OH<sup>−</sup>. De ionisatiegraad bij 25°C is slechts 1,8·10<sup>−9</sup>: één op 500 miljoen watermoleculen.',
'<b>Waterconstante K<sub>w</sub>:</b> [H<sub>3</sub>O<sup>+</sup>][OH<sup>−</sup>] = K<sub>w</sub> = 1,00·10<sup>−14</sup> mol²/L² bij 25°C. Geldig voor zuiver water én elke verdunde waterige oplossing.',
'<b>K<sub>w</sub> is temperatuurafhankelijk:</b> de ionisatie is endotherm, dus stijgende temperatuur geeft een grotere K<sub>w</sub> (bij 40°C: K<sub>w</sub> ≈ 2,9·10<sup>−14</sup>). Daardoor is "neutraal pH = 7" enkel een afspraak voor 25°C.',
'<b>Zuurconstante K<sub>z</sub>:</b> evenwichtsconstante voor de protolyse Z + H<sub>2</sub>O ⇌ B + H<sub>3</sub>O<sup>+</sup> — kwantitatieve maat voor de zuursterkte. Hoe groter K<sub>z</sub>, hoe sterker het zuur.',
'<b>Baseconstante K<sub>b</sub>:</b> analoge constante voor B + H<sub>2</sub>O ⇌ Z + OH<sup>−</sup>. Hoe groter K<sub>b</sub>, hoe sterker de base.',
'<b>K<sub>z</sub> · K<sub>b</sub> = K<sub>w</sub>:</b> voor elk geconjugeerd paar bij 25°C. Dwingt de koppeling af: een sterk zuur heeft altijd een zwakke geconjugeerde base.',
'<b>pK-waarden:</b> pK<sub>z</sub> = −log(K<sub>z</sub>); kleinere pK<sub>z</sub> = sterker zuur. Praktisch makkelijker werken dan met machten van 10.',
'<b>Nivellerend effect van water:</b> alle zuren sterker dan H<sub>3</sub>O<sup>+</sup> worden in water "omgezet" tot H<sub>3</sub>O<sup>+</sup> (sterke zuren). Het sterkste zuur dat in water kan <i>bestaan</i> is H<sub>3</sub>O<sup>+</sup>; de sterkste base is OH<sup>−</sup>.',
'<b>Voorspelling reactieverloop (K-waarde):</b> K > 10<sup>3</sup> → aflopend; 10<sup>−3</sup> < K < 10<sup>3</sup> → evenwicht; K < 10<sup>−3</sup> → reactie verloopt nagenoeg niet. Memotechnisch: "de skiër daalt van sterk zuur naar sterke base".',
'<b>Meerwaardige zuren</b> (H<sub>2</sub>SO<sub>4</sub>, H<sub>3</sub>PO<sub>4</sub>): elke proton-afgifte heeft een eigen K<sub>z</sub>, met K<sub>z1</sub> >> K<sub>z2</sub> >> K<sub>z3</sub> omdat protonafgifte uit een steeds negatievere rest moeilijker wordt.',
],
'3.4':[
'De Deense chemicus <b>Søren Sørensen</b> bedacht in 1909 de grootheid pH (<i>potentia Hydrogenii</i>) om met de zeer kleine [H<sub>3</sub>O<sup>+</sup>]-waarden op een handzame schaal te kunnen werken.',
'<b>Definitie:</b> pH = −log[H<sub>3</sub>O<sup>+</sup>] met [H<sub>3</sub>O<sup>+</sup>] in mol/L. Analoog: pOH = −log[OH<sup>−</sup>].',
'<b>Fundamentele relatie:</b> pH + pOH = 14 bij 25°C — rechtstreeks gevolg van K<sub>w</sub> = 10<sup>−14</sup>.',
'Klassering van waterige oplossingen bij 25°C: <b>zuur</b> pH < 7 · <b>neutraal</b> pH = 7 · <b>basisch</b> pH > 7.',
'In zuiver water: [H<sub>3</sub>O<sup>+</sup>] = [OH<sup>−</sup>] = 10<sup>−7</sup> mol/L → pH = pOH = 7.',
'Bij toevoeging van een zuur stijgt [H<sub>3</sub>O<sup>+</sup>]; via K<sub>w</sub> daalt [OH<sup>−</sup>] (evenwicht van H<sub>2</sub>O ioniseert minder). De toegevoegde H<sub>3</sub>O<sup>+</sup>-ionen dempen de eigen ionisatie van water — dit heet het <b>massa-effect</b>.',
'De pH-schaal loopt praktisch tussen 0 en 14, maar extreme waarden zijn mogelijk: een 2 mol/L HCl-oplossing heeft pH ≈ −0,3.',
'<b>Experimentele pH-bepaling:</b> universeelindicator (snel, benaderend), pH-meter met glaselektrode (nauwkeurig), zuur-base-indicatoren met omslaggebied.',
'<b>Werking van indicatoren:</b> elke indicator is een zwak zuur HInd dat in evenwicht is met zijn geconjugeerde base Ind<sup>−</sup>, beiden met andere kleur. Het omslagpunt valt samen met pK<sub>z</sub>(indicator).',
'<b>Tabel indicatoren:</b> methyloranje 3,1–4,4 (rood→geel) · lakmoes 4,5–8,3 (rood→blauw) · broomthymolblauw 6,0–7,6 (geel→blauw) · fenolftaleïne 8,2–10,0 (kleurloos→fuchsia).',
],
'3.5':[
'<b>Eerste vraag bij elke pH-berekening:</b> is het zuur/base sterk of zwak? Dit bepaalt of we met een aflopende ionisatie of met een evenwichtsuitdrukking moeten werken.',
'<b>Sterk zuur (éénwaardig)</b> — bv. HCl, HNO<sub>3</sub>: ioniseert volledig, dus [H<sub>3</sub>O<sup>+</sup>] = [Z]<sub>0</sub> en pH = −log(c).',
'<b>Tweewaardig sterk zuur</b> (enkel H<sub>2</sub>SO<sub>4</sub>): de eerste protolyse is volledig, de tweede gedeeltelijk maar significant. In dit hoofdstuk benaderen we [H<sub>3</sub>O<sup>+</sup>] = 2·[H<sub>2</sub>SO<sub>4</sub>]<sub>0</sub>.',
'<b>Sterke base (éénwaardig)</b> — bv. NaOH, KOH: [OH<sup>−</sup>] = [B]<sub>0</sub> → pOH = −log(c) → pH = 14 − pOH.',
'<b>Meerwaardige sterke base</b> — bv. Ba(OH)<sub>2</sub>: [OH<sup>−</sup>] = n·[B]<sub>0</sub> waarbij n de waardigheid is.',
'<b>Zwak zuur:</b> de protolyse is een evenwichtsreactie. Uit K<sub>z</sub> = [H<sub>3</sub>O<sup>+</sup>]²/[Z]<sub>0</sub> volgt [H<sub>3</sub>O<sup>+</sup>] = √(K<sub>z</sub>·c) — geldig als de ionisatie verwaarloosbaar is t.o.v. de aanvangsconcentratie.',
'<b>Zwakke base:</b> analoog [OH<sup>−</sup>] = √(K<sub>b</sub>·c).',
'<b>Verificatie van de benadering:</b> ionisatiegraad α = [H<sub>3</sub>O<sup>+</sup>]/c × 100% moet kleiner zijn dan 5%. Bij grote verdunning of zeer zwakke zuren is de benadering ongeldig en moet de volle vierkantsvergelijking opgelost worden.',
'<b>Praktisch:</b> begin steeds met de stof, schrijf de protolysevergelijking, kies de formule, bereken, en eindig met een α-controle voor zwakke zuren/basen.',
],
'3.6':[
'<b>Zuur-base-titratie:</b> kwantitatieve techniek waarbij een oplossing van gekende concentratie (de <b>titrator</b>, in de buret) druppelsgewijs wordt toegevoegd aan een gemeten volume van de onbekende oplossing tot het <b>equivalentiepunt</b> bereikt is.',
'<b>Equivalentiepunt (EP):</b> het ogenblik waarop n(H<sub>3</sub>O<sup>+</sup>) = n(OH<sup>−</sup>) — alle zuur is precies geneutraliseerd door evenveel base. Dit is een stoichiometrisch punt, géén kleuromslag.',
'<b>Titratieformule (valentiewet):</b> x · c<sub>z</sub> · V<sub>z</sub> = y · c<sub>b</sub> · V<sub>b</sub>, waarbij x = waardigheid van het zuur en y = waardigheid van de base.',
'<b>Voorbeelden:</b> HCl + NaOH → c<sub>z</sub>V<sub>z</sub> = c<sub>b</sub>V<sub>b</sub> · H<sub>2</sub>SO<sub>4</sub> + 2NaOH → 2c<sub>z</sub>V<sub>z</sub> = c<sub>b</sub>V<sub>b</sub> · H<sub>3</sub>PO<sub>4</sub> + 3NH<sub>3</sub> → 3c<sub>z</sub>V<sub>z</sub> = c<sub>b</sub>V<sub>b</sub>.',
'<b>pH van het EP:</b> niet altijd 7! Bij sterk zuur + sterke base → pH = 7. Bij zwak zuur + sterke base → het zout hydrolyseert tot een licht basische oplossing (pH > 7). Bij zwakke base + sterk zuur → pH < 7.',
'<b>Kleuromslagpunt indicator</b> = de pH waarbij [HInd] = [Ind<sup>−</sup>] = pK<sub>z</sub>(indicator). Kies de indicator zodat haar omslag <i>binnen</i> de pH-sprong van de titratiecurve valt, zo dicht mogelijk bij het EP.',
'<b>Titratiecurve:</b> grafiek van pH versus volume titrator. Vertoont een steile sprong rond het EP — bij sterk-sterk een sprong van ca. pH 3 tot 11; bij zwak-sterk een kortere sprong rond pH 7–11.',
'<b>Halfweg het EP</b> bij titratie van zwak zuur met sterke base: pH = pK<sub>z</sub> — dan zijn [zuur] en [zout] gelijk, en de oplossing gedraagt zich als een ideale buffer (zie §3.7).',
'<b>Praktisch:</b> bij sterk-sterk werken beide fenolftaleïne en methyloranje. Bij zwak zuur + sterke base: alleen fenolftaleïne (omslag pH 8–10). Bij zwakke base + sterk zuur: alleen methyloranje (omslag pH 3–4).',
],
'3.7':[
'<b>Buffermengsel</b> = oplossing van een zwak zuur en zijn geconjugeerde base in vergelijkbare concentraties (typisch 1:10 tot 10:1). Doel: een stabiele pH die nauwelijks verandert bij toevoeging van een kleine hoeveelheid sterk zuur of sterke base, of bij verdunning.',
'<b>Werking — verklaring via evenwichten:</b> in een CH<sub>3</sub>COOH/CH<sub>3</sub>COONa-buffer treden drie processen op:<br>(a) CH<sub>3</sub>COOH + H<sub>2</sub>O ⇌ CH<sub>3</sub>COO<sup>−</sup> + H<sub>3</sub>O<sup>+</sup><br>(b) CH<sub>3</sub>COONa → CH<sub>3</sub>COO<sup>−</sup> + Na<sup>+</sup> (volledig)<br>(c) CH<sub>3</sub>COO<sup>−</sup> + H<sub>2</sub>O ⇌ CH<sub>3</sub>COOH + OH<sup>−</sup>',
'<b>Toevoegen van zuur:</b> evenwicht (a) verschuift naar links, de extra H<sub>3</sub>O<sup>+</sup> reageert met de overvloed aan CH<sub>3</sub>COO<sup>−</sup>. De pH daalt nauwelijks.',
'<b>Toevoegen van base:</b> evenwicht (c) verschuift naar links, de extra OH<sup>−</sup> reageert met de overvloed aan CH<sub>3</sub>COOH. De pH stijgt nauwelijks.',
'<b>Henderson-Hasselbalch:</b> pH = pK<sub>z</sub> + log([A<sup>−</sup>]/[HA]) — directe pH-berekening voor een buffer. Bij gelijke concentraties valt log(1) = 0 weg → pH = pK<sub>z</sub>.',
'<b>Buffercapaciteit:</b> grootst bij gelijke concentraties van zuur en geconjugeerde base (pH = pK<sub>z</sub>) — de "ideale buffer". Stijgt ook met de totale concentratie: een 0,2 M buffer is dubbel zo veerkrachtig als een 0,1 M buffer.',
'<b>Buffergebied:</b> typisch pH = pK<sub>z</sub> ± 1. Buiten dit interval daalt de capaciteit snel.',
'<b>Bloedbuffer H<sub>2</sub>CO<sub>3</sub>/HCO<sub>3</sub><sup>−</sup>:</b> houdt de bloed-pH tussen 7,35 en 7,45. In het bloed is [HCO<sub>3</sub><sup>−</sup>] ≈ 20 × [H<sub>2</sub>CO<sub>3</sub>] — geoptimaliseerd om <i>zure</i> stofwisselingsproducten op te vangen.',
'<b>Klinisch:</b> hyperventilatie blaast te veel CO<sub>2</sub> uit → evenwicht verschuift, pH stijgt → <b>respiratoire alkalose</b>. Hypoventilatie omgekeerd → <b>respiratoire acidose</b>. Andere fysiologische buffers: H<sub>2</sub>PO<sub>4</sub><sup>−</sup>/HPO<sub>4</sub><sup>2−</sup>, eiwitten, aminozuren.',
'<b>Praktische toepassingen:</b> ijken van pH-meters, farmaceutische formuleringen, kleurstof- en metaalbedrijven, biochemische experimenten, enzymactiviteit.',
],
'4.1':[
'<b>Twee soorten reacties:</b> bij een <i>ionuitwisselingsreactie</i> blijven alle oxidatiegetallen (OG) ongewijzigd; bij een <b>redoxreactie</b> verandert het OG van minstens twee elementen — er worden elektronen uitgewisseld.',
'<b>Oxidatie</b> = OG stijgt = elektronen worden <b>afgegeven</b>. Het deeltje dat oxideert is de <b>reductor (RED)</b> = elektronendonor.',
'<b>Reductie</b> = OG daalt = elektronen worden <b>opgenomen</b>. Het deeltje dat reduceert is de <b>oxidator (OX)</b> = elektronenacceptor.',
'<b>Onthoud:</b> de reductor wordt zelf <i>geoxideerd</i>; de oxidator wordt zelf <i>gereduceerd</i>. Beide processen treden steeds gelijktijdig op — vandaar "redox" (reductie-oxidatie).',
'<b>Elektronenbalans:</b> het aantal afgegeven elektronen is steeds gelijk aan het aantal opgenomen elektronen.',
'<b>Analogie zuur-base ↔ redox:</b> zuur = protondonor — reductor = elektronendonor. Base = protonacceptor — oxidator = elektronenacceptor.',
'<b>OG-regels:</b> vrij element = 0 · enkelvoudig ion = lading · ΣOG = 0 (molecule) of = lading (ion). O = −2 (uitzondering: peroxide −1). H = +1 (uitzondering: metaalhydride −1).',
'<b>Redoxbrug:</b> visualisatiemethode waarbij men onder elk element het OG schrijft en met een pijlbrug aanduidt welk element oxideert (boven) en welk reduceert (onder), telkens met het aantal uitgewisselde elektronen.',
'<b>Stoffen vs. deeltjes:</b> de termen oxidator/reductor slaan strikt op deeltjes. We noemen K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub> een oxidans omdat het de sterke oxidator Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup> bevat; metalen zijn reductoren want hun OG kan enkel stijgen.',
'<b>Ezelsbruggetje:</b> OIL RIG — <i>Oxidation Is Loss, Reduction Is Gain</i> (van elektronen).',
],
'4.2':[
'<b>Spanningsreeks (verdringingsreeks):</b> rangschikking van metalen volgens hun neiging om elektronen af te staan, opgesteld door experimenteel te toetsen welk metaal welk ander uit oplossing kan verdringen.',
'<b>Klassieke proef:</b> dompel een Zn-staafje in CuSO<sub>4</sub>-oplossing → Zn lost op, Cu zet zich af. Dompel Cu in ZnSO<sub>4</sub> → er gebeurt niets. Besluit: Zn is sterkere reductor dan Cu.',
'<b>Reeks (boven → onder):</b> Ca, Na, Mg, Al, Zn, Fe, Sn, Pb, [H<sub>2</sub>], Cu, Ag, Hg, Au.',
'<b>Onedele metalen</b> (bovenin) zijn sterke reductoren — hun overeenkomstige ionen zijn zwakke oxidatoren. <b>Edele metalen</b> (Au, Pt, Ag) zijn zwakke reductoren — hun ionen zijn sterke oxidatoren.',
'<b>H<sub>2</sub> als referentie:</b> de enige niet-metaal in de reeks. Het redoxkoppel H<sub>3</sub>O<sup>+</sup>/H<sub>2</sub> dient als nulpunt (E<sup>0</sup> = 0,00 V) voor de kwantitatieve schaal in §4.3.',
'<b>Diagonaalregel (voorspelling):</b> een redoxreactie tussen metaalatoom A (boven) en metaalion B<sup>n+</sup> (onder) verloopt <i>spontaan</i> — dalende groene lijn van RED naar OX in de tabel. Omgekeerde combinatie → geen spontane reactie.',
'<b>Sterkste reductor / oxidator:</b> in de schoolreeks is Ca (of Mg) de sterkste reductor; Au<sup>3+</sup> de sterkste oxidator. Reactie tussen sterkste RED en sterkste OX heeft het grootst potentiaalverschil.',
'<b>Praktische gevolgen:</b> ijzer roest in contact met koper (Fe is sterker reductor → wordt opgeoffert); galvanische bescherming van pijpleidingen door verteringselektroden van Zn of Mg; edele metalen komen in de natuur zelden in verbinding voor.',
'<b>Redoxkoppel-notatie:</b> elke halfreactie wordt geschreven als reductie OX + n e<sup>−</sup> ⇌ RED, verkort genoteerd als OX/RED (bv. Cu<sup>2+</sup>/Cu, Zn<sup>2+</sup>/Zn).',
'<b>Sterk OX → zwakke geconjugeerde RED</b> en omgekeerd — perfect analoog aan de zuur-base wereld.',
],
'4.3':[
'<b>Normpotentiaal E<sup>0</sup>:</b> kwantitatieve maat voor de redoxsterkte van een halfreactie, gemeten als de spanning t.o.v. de standaardwaterstofelektrode (SHE) onder <i>normomstandigheden</i>.',
'<b>Normomstandigheden:</b> T = 298 K (25°C), c = 1 mol/L, p = 1013 hPa. Door afspraak: E<sup>0</sup>(H<sub>3</sub>O<sup>+</sup>/H<sub>2</sub>) = 0,00 V.',
'<b>Negatieve E<sup>0</sup>:</b> redoxkoppel bevat een sterkere reductor dan H<sub>2</sub> en een zwakkere oxidator dan H<sub>3</sub>O<sup>+</sup> (bv. Mg, Zn). <b>Positieve E<sup>0</sup>:</b> zwakkere RED, sterkere OX (bv. Cu, Ag).',
'<b>Hoe lager (negatiever) E<sup>0</sup>, hoe sterker de reductor.</b> Hoe hoger (positiever) E<sup>0</sup>, hoe sterker de oxidator. Voorbeeld: E<sup>0</sup>(Li<sup>+</sup>/Li) = −3,02 V → Li is de sterkste reductor uit de tabel.',
'<b>Bronspanning U<sub>b</sub>:</b> meetbaar potentiaalverschil tussen twee halfcellen — U<sub>b</sub> = E<sup>0</sup>(kathode) − E<sup>0</sup>(anode), waarbij de kathode (hogere E<sup>0</sup>) de reductie ondergaat en de anode (lagere E<sup>0</sup>) de oxidatie.',
'<b>Spontaniteit:</b> U<sub>b</sub> > 0 betekent ΔG < 0, dus spontane redoxreactie. U<sub>b</sub> < 0 vereist energietoevoer (elektrolyse).',
'<b>Belangrijke valkuil:</b> E<sup>0</sup> wordt <b>NIET</b> vermenigvuldigd met stoichiometrische coëfficiënten. E<sup>0</sup> is een intensieve grootheid, geen extensieve.',
'<b>Wet van Nernst (uitbreiding):</b> in een werkelijke cel wijken de concentraties af van 1 mol/L; de reële potentiaal E volgt dan E = E<sup>0</sup> − (RT/nF) · ln(Q) — de potentiaal hangt af van de stand van het evenwicht.',
'<b>Tabel met normpotentialen:</b> de schoolversie loopt globaal van Li<sup>+</sup>/Li (−3,02 V) tot F<sub>2</sub>/F<sup>−</sup> (+2,87 V). Voor metalen: Mg<sup>2+</sup>/Mg = −2,36 V; Zn<sup>2+</sup>/Zn = −0,76 V; Cu<sup>2+</sup>/Cu = +0,34 V; Au<sup>3+</sup>/Au = +1,50 V.',
],
'4.4':[
'<b>Galvanische cel</b> = chemische stroombron: een toestel waarin een spontane redoxreactie chemische energie rechtstreeks omzet in elektrische energie (ΔG < 0, U<sub>b</sub> > 0).',
'<b>Historisch:</b> Luigi Galvani (1737–1798) merkte op dat dode kikkerpoten samentrekken bij contact met twee verschillende metalen — hij dacht (foutief) aan "dierlijke elektriciteit". Alessandro Volta (1745–1827) ontdekte dat het potentiaalverschil tussen de metalen de oorzaak was, en bouwde in 1800 de eerste batterij (Volta-zuil). De eenheid "Volt" is naar hem genoemd.',
'<b>Daniell-cel</b> (J.F. Daniell, 1836): de klassieke didactische cel. Bestaat uit twee <b>halfcellen</b> — een Zn-elektrode in ZnSO<sub>4</sub>-oplossing en een Cu-elektrode in CuSO<sub>4</sub>-oplossing — verbonden door een externe metaaldraad en een zoutbrug.',
'<b>Anode (Zn):</b> Zn → Zn<sup>2+</sup> + 2e<sup>−</sup>. Oxidatie. Elektronen vloeien door de externe draad weg. De Zn-elektrode wordt aangevreten en is <b>negatief</b> geladen (galvanisch: anode = − pool).',
'<b>Kathode (Cu):</b> Cu<sup>2+</sup> + 2e<sup>−</sup> → Cu. Reductie. Elektronen komen vanuit de externe draad aan. De Cu-elektrode wordt aangeladen en is <b>positief</b> geladen.',
'<b>Externe metaaldraad:</b> transporteert elektronen van anode naar kathode. Hierin kan een verbruiker (lamp, motor) of voltmeter geplaatst worden om de elektrische energie te benutten of te meten.',
'<b>Zoutbrug (ionen-/elektrolytbrug):</b> U-vormige buis met geconcentreerde zoutoplossing (KNO<sub>3</sub>, KCl) in agar-gel. Compenseert de ladingsveranderingen — anionen migreren naar de anodecel (waar Zn<sup>2+</sup> ophoopt), kationen naar de kathodecel.',
'<b>Zonder zoutbrug</b> stopt de reactie: zonder ionentransport zou de anodecel te positief en de kathodecel te negatief worden, en het potentiaalverschil zou de elektronenstroom onmiddellijk blokkeren.',
'<b>Bronspanning Daniell:</b> U<sub>b</sub> = E<sup>0</sup>(Cu<sup>2+</sup>/Cu) − E<sup>0</sup>(Zn<sup>2+</sup>/Zn) = 0,34 − (−0,76) = +1,10 V.',
'<b>Symbolische voorstelling:</b> anode | anode-opl. || kathode-opl. | kathode. Voorbeeld Daniell: <code>Zn | Zn<sup>2+</sup>(1M) || Cu<sup>2+</sup>(1M) | Cu</code>. Anode steeds links, kathode rechts; | = fasescheiding, || = zoutbrug.',
'<b>Toepassingen in het dagelijkse leven:</b> alkalinebatterij (Zn-anode, MnO<sub>2</sub>-kathode), lithiumionbatterij (oplaadbaar, gsm/laptop), brandstofcel (H<sub>2</sub>+O<sub>2</sub>→H<sub>2</sub>O, duurzame mobiliteit), knoopcel.',
'<b>Corrosie</b> is een ongewenste galvanische cel: ijzer in vochtige lucht vormt een microcel met opgeloste O<sub>2</sub> als oxidator → Fe<sup>2+</sup> ontstaat → uiteindelijk roest (Fe<sub>2</sub>O<sub>3</sub>·xH<sub>2</sub>O). Bescherming: coating, vertinning, verzinking (Zn als opofferende verteringselektrode), inox-legering (Fe+Cr+Ni).',
],
'4.5':[
'<b>Elektrolyse</b> = gedwongen redoxreactie. Een externe spanningsbron dwingt een niet-spontane reactie (U<sub>b</sub> < 0, ΔG > 0) toch te verlopen door elektrische energie toe te voeren. Het tegenovergestelde van een galvanische cel.',
'<b>Volgorde van gebeurtenissen — verschilt fundamenteel van galvanisch:</b> bij elektrolyse zijn de elektroden eerst geladen <i>door de externe bron</i>, en pas daarna treedt oxidatie/reductie op. Bij galvanisch komt eerst de redoxreactie, dan pas de lading.',
'<b>Pooltekens omgekeerd:</b> de elektrode verbonden met de <b>+</b>pool van de spanningsbron wordt zelf positief (anode); de elektrode verbonden met de <b>−</b>pool wordt zelf negatief (kathode). Anionen migreren naar de + anode; kationen naar de − kathode.',
'<b>Welke deeltjes reageren?</b> Net zoals bij protolyse: de sterkste aanwezige OX wordt gereduceerd aan de kathode; de sterkste aanwezige RED wordt geoxideerd aan de anode.',
'<b>Belangrijke beperking:</b> bij elektrolyse moet een negatief deeltje aan de + anode geraken om te oxideren, en een positief deeltje aan de − kathode om te reduceren. Geladen deeltjes met "verkeerd" teken worden afgestoten.',
'<b>Waterige oplossing:</b> H<sub>2</sub>O concurreert mee. Bij elektrolyse van NaCl(aq) wordt Na<sup>+</sup> NIET gereduceerd (E<sup>0</sup> = −2,71 V); in plaats daarvan wordt H<sub>2</sub>O gereduceerd tot H<sub>2</sub> aan de kathode. Aan de anode wordt Cl<sup>−</sup> wel geoxideerd tot Cl<sub>2</sub>.',
'<b>Gesmolten zout (smeltelektrolyse):</b> geen water aanwezig → Na<sup>+</sup> wordt wél gereduceerd tot Na-metaal. Enige manier om sterke reductoren als Na, K, Mg, Al industrieel te bereiden.',
'<b>Industriële toepassingen — productie:</b> Al uit Al<sub>2</sub>O<sub>3</sub> (Hall-Héroult), Cl<sub>2</sub> + NaOH + H<sub>2</sub> uit pekel (chloor-alkali), Na uit gesmolten NaCl (Downs-cel), H<sub>2</sub> uit water (energieopslag).',
'<b>Industriële toepassingen — zuivering en oppervlaktebehandeling:</b> raffinage van koper (anode = ruw koper, kathode = zuiver koper); galvanisering (verchromen, vergulden, verzinken); aanbrengen van metaaloppervlakken in elektronica.',
'<b>Energievoorwaarde:</b> U<sub>ext</sub> > |U<sub>b</sub>(cel)|; in de praktijk nog meer door <b>overpotentiaal</b> (extra spanning nodig wegens kinetische barrières — bv. waterelektrolyse vereist ~1,8 V terwijl theoretisch slechts 1,23 V).',
],
'4.6':[
'<b>Doel:</b> een redoxreactievergelijking opstellen waarbij zowel de atomenbalans (massabehoud) als de ladingsbalans (ladingsbehoud) kloppen. Twee methodes: <b>redoxbrug</b> en <b>halfreacties</b>.',
'<b>Methode redoxbrug — stappen:</b>',
'① Schrijf het gekende gedeelte met deeltjes zoals ze werkelijk voorkomen (ionen voor zouten/zuren/basen, moleculen voor enkelvoudige stoffen en oxiden) — nog zonder coëfficiënten.',
'② Bepaal het OG van elk atoom; identificeer welke elementen van OG veranderen.',
'③ Bereken het aantal afgegeven en opgenomen elektronen; teken de redoxbrug.',
'④ <b>Elektronenbalans (EB):</b> stel afgegeven = opgenomen via het kleinste gemeen veelvoud → coëfficiënten van RED en OX.',
'⑤ <b>Ladingsbalans (LB):</b> in zuur milieu met H<sub>3</sub>O<sup>+</sup>, in basisch milieu met OH<sup>−</sup>.',
'⑥ <b>Atomenbalans (AB):</b> sluiten met H<sub>2</sub>O. Resultaat: de essentiële reactievergelijking. Indien gevraagd → schrijf om naar de volledige stoffenreactievergelijking.',
'<b>Methode halfreacties:</b> noteer reductie- en oxidatiehalfreactie afzonderlijk (uit de tabel), elk al gebalanceerd voor atomen en lading. Maak de e<sup>−</sup> gelijk door vermenigvuldiging, en tel beide halfreacties op. Schrap e<sup>−</sup> en gemeenschappelijke deeltjes uit linker- en rechterlid.',
'<b>Voorbeeld (zuur milieu) MnO<sub>4</sub><sup>−</sup> + Fe<sup>2+</sup>:</b><br>Red: MnO<sub>4</sub><sup>−</sup> + 8H<sup>+</sup> + 5e<sup>−</sup> → Mn<sup>2+</sup> + 4H<sub>2</sub>O<br>Ox: Fe<sup>2+</sup> → Fe<sup>3+</sup> + e<sup>−</sup> &nbsp;(×5)<br>Totaal: MnO<sub>4</sub><sup>−</sup> + 5Fe<sup>2+</sup> + 8H<sup>+</sup> → Mn<sup>2+</sup> + 5Fe<sup>3+</sup> + 4H<sub>2</sub>O.',
'<b>Voorspelling van het verloop:</b> ΔE<sup>0</sup> = E<sup>0</sup>(OX) − E<sup>0</sup>(RED). K is groot bij positieve ΔE<sup>0</sup> (aflopend), klein bij negatieve ΔE<sup>0</sup> (niet-opgaand), in de buurt van 1 bij kleine |ΔE<sup>0</sup>| (evenwicht).',
'<b>Controle achteraf:</b> een gebalanceerde redoxvergelijking bevat geen losse e<sup>−</sup> meer; de som van de ladingen links = som rechts; aantal atomen per element klopt links = rechts.',
],
};

// ── COMPACT SUMMARIES (abstract per section, 3–5 bullets) ─────────────────────
const SUMM = {
'3.1':[
'Arrhenius (1884): zuur ioniseert in water tot H<sup>+</sup>; base dissocieert tot OH<sup>−</sup>.',
'Sterk = volledige ionisatie (→); zwak = gedeeltelijke ionisatie (⇌).',
'Theorie geldt enkel in waterig milieu; NH<sub>3</sub> past niet → aanleiding voor Brønsted-Lowry.',
'Indicatoren visualiseren het zuur/basisch karakter via kleuromslag.',
],
'3.2':[
'Brønsted-Lowry (1923): zuur = protondonor, base = protonacceptor.',
'Elke protolyse bevat twee geconjugeerde paren — zuur en base verschillen met 1 H<sup>+</sup>.',
'Amfolyten (H<sub>2</sub>O, HCO<sub>3</sub><sup>−</sup>) reageren naargelang de reactiepartner als zuur of als base.',
'Evenwicht ligt aan de zwakste kant — sterkste zuur en sterkste base reageren volledig.',
],
'3.3':[
'Autoprotolyse water: K<sub>w</sub> = [H<sub>3</sub>O<sup>+</sup>][OH<sup>−</sup>] = 10<sup>−14</sup> bij 25°C, T-afhankelijk.',
'K<sub>z</sub>, K<sub>b</sub> meten zuur/base-sterkte; pK = −log(K) — kleinere pK = sterker.',
'Per geconjugeerd paar: K<sub>z</sub>·K<sub>b</sub> = K<sub>w</sub>.',
'Reactieverloop: K > 10<sup>3</sup> aflopend · 10<sup>−3</sup> < K < 10<sup>3</sup> evenwicht · K < 10<sup>−3</sup> niet.',
'Water-nivellering: sterkste zuur in water = H<sub>3</sub>O<sup>+</sup>; sterkste base = OH<sup>−</sup>.',
],
'3.4':[
'pH = −log[H<sub>3</sub>O<sup>+</sup>] (Sørensen, 1909); pOH analoog.',
'pH + pOH = 14 (bij 25°C).',
'Zuur pH < 7 · neutraal pH = 7 · basisch pH > 7.',
'Experimentele bepaling: pH-meter (nauwkeurig) of universeelindicator (snel).',
'Omslagpunt indicator = pK<sub>z</sub>(indicator).',
],
'3.5':[
'Sterk zuur: pH = −log(c). Sterke base: pH = 14 + log(c).',
'Meerwaardig sterk zuur (H<sub>2</sub>SO<sub>4</sub>): [H<sub>3</sub>O<sup>+</sup>] = 2·c<sub>0</sub>.',
'Zwak zuur: [H<sub>3</sub>O<sup>+</sup>] = √(K<sub>z</sub>·c); idem voor zwakke base met K<sub>b</sub>.',
'Controleer α = [H<sub>3</sub>O<sup>+</sup>]/c × 100% < 5% — anders benadering ongeldig.',
],
'3.6':[
'Equivalentiepunt: n(H<sub>3</sub>O<sup>+</sup>) = n(OH<sup>−</sup>).',
'Valentiewet: x·c<sub>z</sub>·V<sub>z</sub> = y·c<sub>b</sub>·V<sub>b</sub>.',
'pH bij EP: sterk-sterk = 7; zwak-sterk > 7; sterk-zwak < 7.',
'Indicatorkeuze: omslag moet vallen binnen de pH-sprong, dicht bij EP.',
'Halfweg titratie zwak-sterk: pH = pK<sub>z</sub> (buffergedrag).',
],
'3.7':[
'Buffer = zwak zuur HA + geconjugeerde base A<sup>−</sup> in vergelijkbare concentraties.',
'Henderson-Hasselbalch: pH = pK<sub>z</sub> + log([A<sup>−</sup>]/[HA]).',
'Capaciteit groot bij [A<sup>−</sup>] = [HA] (pH = pK<sub>z</sub>) en bij hoge concentraties.',
'Bloedbuffer H<sub>2</sub>CO<sub>3</sub>/HCO<sub>3</sub><sup>−</sup> houdt pH op 7,35–7,45.',
'Hyperventilatie → alkalose; hypoventilatie → acidose.',
],
'4.1':[
'Redox = elektronen-uitwisseling; OG van minstens twee elementen verandert.',
'Oxidatie = OG ↑ = e<sup>−</sup> afgegeven (reductor). Reductie = OG ↓ = e<sup>−</sup> opgenomen (oxidator).',
'Analogie zuur-base: zuur ↔ reductor; base ↔ oxidator.',
'Redoxbrug visualiseert OG-veranderingen en het aantal uitgewisselde elektronen.',
'<b>KRAO</b> hieronder — basisregel voor alle elektrochemie.',
],
'4.2':[
'Spanningsreeks rangschikt metalen op reductorkracht (verdringingsproef).',
'Boven = onedel = sterke RED; onder = edel = zwakke RED. H<sub>2</sub> dient als referentie.',
'Diagonaalregel: spontane redoxreactie tussen metaal-RED (boven) en metaal<sup>+</sup>-OX (onder).',
'Pooltekens komen aan bod in §4.4–§4.5 — zie <b>KRAO/KPAN/KNAP</b> hieronder.',
],
'4.3':[
'E<sup>0</sup> = normpotentiaal t.o.v. SHE (0,00 V) onder normomstandigheden.',
'Hoger E<sup>0</sup> = sterker oxidator; lager E<sup>0</sup> = sterker reductor.',
'U<sub>b</sub> = E<sup>0</sup>(kathode) − E<sup>0</sup>(anode); U<sub>b</sub> > 0 = spontaan.',
'E<sup>0</sup> wordt NIET vermenigvuldigd met coëfficiënten.',
],
'4.4':[
'Galvanische cel: spontane redox → elektrische energie (ΔG < 0).',
'Anode (−): oxidatie; kathode (+): reductie. KRAO + KPAN.',
'Zoutbrug compenseert ladingsverschil; zonder zoutbrug stopt de cel.',
'U<sub>b</sub> = E<sup>0</sup>(kathode) − E<sup>0</sup>(anode); notatie: A | A<sup>n+</sup> || K<sup>m+</sup> | K.',
'Toepassingen: batterijen, brandstofcellen; ongewenst → corrosie.',
],
'4.5':[
'Elektrolyse: gedwongen redox → chemische energie (ΔG > 0).',
'Externe spanningsbron laadt elektroden vóór de reactie. Pooltekens omgekeerd t.o.v. galvanisch.',
'KRAO blijft: K = reductie, A = oxidatie. KNAP: K = −, A = +.',
'Waterige oplossing: water concurreert met opgeloste ionen.',
'Industrieel: productie Na, Al, Cl<sub>2</sub>, H<sub>2</sub>; galvanisering, raffinage.',
],
'4.6':[
'Halfreactiemethode of redoxbrug.',
'Stappen: ① schrijf · ② OG · ③ elektronenbalans · ④ ladingsbalans (H<sup>+</sup>/OH<sup>−</sup>) · ⑤ atomenbalans (H<sub>2</sub>O).',
'Zuur milieu: gebruik H<sup>+</sup>/H<sub>3</sub>O<sup>+</sup>. Basisch milieu: gebruik OH<sup>−</sup>.',
'Verloop voorspellen via ΔE<sup>0</sup> en K-waarde.',
'Controle: geen losse e<sup>−</sup>, ladingen + atomen kloppen.',
],
};

// ── KRAO / KPAN / KNAP — Nota Bene constants ─────────────────────────────────
const KRAO = {
title:'KRAO',
rule:'<b>K</b>athode = <b>R</b>eductie &nbsp;·&nbsp; <b>A</b>node = <b>O</b>xidatie',
detail:'Geldig voor <i>beide</i> celtypes — galvanische cel én elektrolyse. Wat aan de elektroden gebeurt is dezelfde half-reactie; enkel de pooltekens verschillen.',
};
const KPAN = {
title:'KPAN — galvanische cel',
rule:'<b>K</b>athode = <b>+</b>pool &nbsp;·&nbsp; <b>A</b>node = <b>−</b>pool',
detail:'De oxidatie aan de anode stuwt elektronen weg → anode wordt negatief geladen. Reductie aan de kathode trekt elektronen aan → kathode wordt positief.',
};
const KNAP = {
title:'KNAP — elektrolyse',
rule:'<b>K</b>athode = <b>−</b>pool &nbsp;·&nbsp; <b>A</b>node = <b>+</b>pool',
detail:'De externe spanningsbron <i>keert</i> de pooltekens om. Kationen migreren naar de − kathode (en reduceren); anionen migreren naar de + anode (en oxideren). Inverteert t.o.v. de galvanische cel.',
};

// ── FORMULARIUM ───────────────────────────────────────────────────────────────
const FORM = {
H3:{
fmls:[
{n:'Zuurevenwicht',f:'K<sub>z</sub> = [H<sub>3</sub>O<sup>+</sup>][Z<sup>−</sup>] / [HZ]'},
{n:'Baseevenwicht',f:'K<sub>b</sub> = [BH<sup>+</sup>][OH<sup>−</sup>] / [B]'},
{n:'Geconj. paar',f:'K<sub>z</sub> · K<sub>b</sub> = K<sub>w</sub> = 10<sup>−14</sup> (25°C)'},
{n:'pH & pOH',f:'pH = −log[H<sub>3</sub>O<sup>+</sup>] &nbsp;&nbsp; pOH = −log[OH<sup>−</sup>] &nbsp;&nbsp; pH + pOH = 14'},
{n:'pKz',f:'pK<sub>z</sub> = −log(K<sub>z</sub>) &nbsp;&nbsp; K<sub>z</sub> = 10<sup>−pKz</sup>'},
{n:'Zwak zuur',f:'[H<sub>3</sub>O<sup>+</sup>] = √(K<sub>z</sub>·c) &nbsp;&nbsp; als α < 5%'},
{n:'Ionisatiegraad',f:'α = [H<sub>3</sub>O<sup>+</sup>]/c × 100%'},
{n:'Valentiewet',f:'n<sub>z</sub>·c<sub>z</sub>·V<sub>z</sub> = n<sub>b</sub>·c<sub>b</sub>·V<sub>b</sub>'},
{n:'Henderson-H.',f:'pH = pK<sub>z</sub> + log([A<sup>−</sup>]/[HA])'},
],
tabs:[
{title:'Sterke zuren (volledige ionisatie →)',heads:['Stof','Formule'],rows:[
['Zoutzuur','HCl'],['Broomwaterstof','HBr'],['Joodwaterstof','HI'],
['Salpeterzuur','HNO<sub>3</sub>'],['Zwavelzuur (1e stap)','H<sub>2</sub>SO<sub>4</sub>'],['Perchloorzuur','HClO<sub>4</sub>'],
]},
{title:'Zwakke zuren — K<sub>z</sub>-waarden (tabellenbundel, 25°C)',heads:['Stof','Formule','K<sub>z</sub>','pK<sub>z</sub>'],rows:[
['Mierenzuur','HCOOH','1,77×10<sup>−4</sup>','3,75'],
['Azijnzuur','CH<sub>3</sub>COOH','1,74×10<sup>−5</sup>','4,76'],
['Waterstofhypochloriet','HClO','2,88×10<sup>−8</sup>','7,54'],
['Ammoniumion','NH<sub>4</sub><sup>+</sup>','5,6×10<sup>−10</sup>','9,25'],
['Koolzuur (1e stap)','H<sub>2</sub>CO<sub>3</sub>','4,3×10<sup>−7</sup>','6,37'],
['Bicarbonaat (2e stap)','HCO<sub>3</sub><sup>−</sup>','4,7×10<sup>−11</sup>','10,33'],
]},
],
usage:'K<sub>z</sub>-tabel: gebruik bij berekening [H<sub>3</sub>O<sup>+</sup>] in zwakzuuroplossingen. Verifieer steeds α < 5% na de berekening. Valentiewet: let op n-waarden (bv. n=2 voor H<sub>2</sub>SO<sub>4</sub>). Henderson-Hasselbalch: base/zuur = A<sup>−</sup>/HA — teller is de base!',
},
H4:{
fmls:[
{n:'Bronspanning',f:'U<sub>b</sub> = E<sup>0</sup>(kathode) − E<sup>0</sup>(anode)'},
{n:'Spontaniteit',f:'U<sub>b</sub> > 0: spontaan (galvanisch) &nbsp;&nbsp; U<sub>b</sub> < 0: niet spontaan'},
{n:'OG-regels',f:'ΣOG(molecule) = 0 &nbsp;·&nbsp; ΣOG(ion) = lading\nO = −2, H = +1, vrij element = 0'},
],
tabs:[
{title:'Normpotentiaalreeks E⁰ (25°C, 1 mol/L, t.o.v. SHE)',heads:['Halfcel (Ox/Red)','E<sup>0</sup> (V)'],rows:[
['Mg<sup>2+</sup>/Mg','−2,36'],
['Al<sup>3+</sup>/Al','−1,66'],
['Zn<sup>2+</sup>/Zn','−0,76'],
['Fe<sup>2+</sup>/Fe','−0,44'],
['Ni<sup>2+</sup>/Ni','−0,23'],
['Sn<sup>2+</sup>/Sn','−0,14'],
['Pb<sup>2+</sup>/Pb','−0,13'],
['H<sup>+</sup>/H<sub>2</sub>','0,00'],
['Cu<sup>2+</sup>/Cu','+0,34'],
['Ag<sup>+</sup>/Ag','+0,80'],
['Au<sup>3+</sup>/Au','+1,50'],
]},
],
usage:'Kathode = hoogste E<sup>0</sup> (reductie); anode = laagste E<sup>0</sup> (oxidatie). U<sub>b</sub> = E<sup>0</sup>(kathode) − E<sup>0</sup>(anode). <b>Valkuil:</b> E<sup>0</sup> wordt NIET vermenigvuldigd met coëfficiënten! Tabel lezen: linkerkolom = geoxideerde vorm (Ox), rechterkolom = gereduceerde vorm (Red).',
},
};

// ── TEST QUESTIONS ────────────────────────────────────────────────────────────
const TQ = {
H3:[
{q:'Een patiënt heeft maagzuur-pH = 1,5. Welke [H<sub>3</sub>O<sup>+</sup>] heerst in de maag?',o:['1,5×10<sup>−1</sup> mol/L','3,16×10<sup>−2</sup> mol/L','1,5 mol/L','1,5×10<sup>−14</sup> mol/L'],c:1,e:'[H<sub>3</sub>O<sup>+</sup>] = 10<sup>−1,5</sup> = 3,16×10<sup>−2</sup> mol/L. Optie a is fout (pH-waarde verward met c).'},
{q:'Bloed heeft normaal pH = 7,40. Bij ernstige acidose daalt dit tot pH = 7,10. De [H<sub>3</sub>O<sup>+</sup>] is dan toegenomen met factor:',o:['1,3','2,0','3,0','10'],c:1,e:'10<sup>7,40−7,10</sup> = 10<sup>0,30</sup> ≈ 2,0× — pH-schaal is logaritmisch dus kleine pH-veranderingen geven grote relatieve [H<sup>+</sup>]-wijzigingen.'},
{q:'Voor zure regen werd HNO<sub>3</sub> met c = 1,0×10<sup>−4</sup> mol/L gemeten. De pH is:',o:['4,0','10,0','3,0','7,0'],c:0,e:'HNO<sub>3</sub> sterk zuur, volledige ionisatie: [H<sup>+</sup>] = 10<sup>−4</sup> → pH = 4. Optie b komt van verkeerd pOH/pH.'},
{q:'Een buffer met pH = pK<sub>z</sub> heeft welke verhouding [A<sup>−</sup>]/[HA]?',o:['0,1','1,0','10','100'],c:1,e:'pH = pK<sub>z</sub> + log(r) → log(r) = 0 → r = 1. Optimale buffercapaciteit.'},
{q:'Bij 25°C heeft een oplossing [OH<sup>−</sup>] = 2,5×10<sup>−3</sup> mol/L. De pH is:',o:['2,60','11,40','12,40','11,60'],c:1,e:'pOH = −log(2,5×10<sup>−3</sup>) = 2,60 → pH = 14 − 2,60 = 11,40. Optie a is pOH (verwarring).'},
{q:'Een atleet vormt melkzuur in spier (pK<sub>z</sub> = 3,85). Bij intracellulaire pH = 6,85: wat is [lactaat<sup>−</sup>]/[melkzuur]?',o:['1','10','100','1000'],c:3,e:'log(r) = pH − pK<sub>z</sub> = 6,85 − 3,85 = 3,00 → r = 10<sup>3</sup> = 1000. Bij fysiologische pH is melkzuur grotendeels in lactaat-vorm.'},
{q:'Welk volume 0,200 M NaOH is nodig om 25,0 mL 0,150 M HCl te neutraliseren?',o:['18,75 mL','33,3 mL','37,5 mL','50,0 mL'],c:0,e:'c<sub>z</sub>V<sub>z</sub> = c<sub>b</sub>V<sub>b</sub> → V<sub>b</sub> = 0,150·25,0/0,200 = 18,75 mL.'},
{q:'pH van 0,10 M azijnzuur (K<sub>z</sub>=1,74×10<sup>−5</sup>) is dichtstbijzijnd:',o:['1,00','2,88','4,76','5,00'],c:1,e:'[H<sup>+</sup>] = √(1,74×10<sup>−5</sup>·0,10) = 1,32×10<sup>−3</sup> → pH = 2,88. Optie c is pK<sub>z</sub> (verwarring).'},
{q:'Bij hyperventilatie verdwijnt CO<sub>2</sub> uit bloed. Het H<sub>2</sub>CO<sub>3</sub>/HCO<sub>3</sub><sup>−</sup>-evenwicht verschuift:',o:['Naar rechts; pH daalt','Naar links; pH stijgt','Naar rechts; pH stijgt','Naar links; pH daalt'],c:1,e:'CO<sub>2</sub>+H<sub>2</sub>O⇌H<sub>2</sub>CO<sub>3</sub>⇌HCO<sub>3</sub><sup>−</sup>+H<sup>+</sup>. Verlies CO<sub>2</sub> → evenwicht naar links → minder H<sup>+</sup> → pH stijgt (respiratoire alkalose).'},
{q:'Een leerling lost 4,00 g NaOH (M=40) op tot 250 mL. De pH is:',o:['1,40','12,60','13,60','14,0'],c:2,e:'c = 0,400 M → [OH<sup>−</sup>] = 0,400 → pOH = 0,40 → pH = 13,60. Optie d gaat ervan uit c=1M.'},
{q:'De geconjugeerde base van H<sub>2</sub>PO<sub>4</sub><sup>−</sup> is:',o:['H<sub>3</sub>PO<sub>4</sub>','HPO<sub>4</sub><sup>2−</sup>','PO<sub>4</sub><sup>3−</sup>','OH<sup>−</sup>'],c:1,e:'Conjugaatbase = zuur − 1 H<sup>+</sup>: H<sub>2</sub>PO<sub>4</sub><sup>−</sup> − H<sup>+</sup> = HPO<sub>4</sub><sup>2−</sup>. Optie a is conjugaatzuur.'},
{q:'Welk paar vormt een buffer?',o:['HCl + NaCl','NH<sub>3</sub> + NH<sub>4</sub>Cl','NaOH + Na<sub>2</sub>SO<sub>4</sub>','HNO<sub>3</sub> + KOH'],c:1,e:'Zwakke base + geconj. zuur = buffer. HCl is sterk → geen evenwicht; NaOH zelfde.'},
{q:'Een leerling titreert azijnzuur (0,10 M) met NaOH. Welke indicator is meest geschikt?',o:['Methyloranje (3,1–4,4)','Lakmoes (4,5–8,3)','Fenolftaleïne (8,2–10,0)','Broomthymolblauw (6,0–7,6)'],c:2,e:'Zwak zuur + sterke base → EP bij pH ≈ 8,7 (CH<sub>3</sub>COO<sup>−</sup> hydrolyseert basisch). Alleen fenolftaleïne ligt in juiste gebied.'},
{q:'Een buffer met 0,10 M CH<sub>3</sub>COOH + 0,20 M CH<sub>3</sub>COONa (pK<sub>z</sub>=4,76) heeft pH:',o:['4,46','4,76','5,06','5,36'],c:2,e:'pH = 4,76 + log(0,20/0,10) = 4,76 + 0,30 = 5,06.'},
{q:'Het ionenproduct van water K<sub>w</sub> = [H<sub>3</sub>O<sup>+</sup>][OH<sup>−</sup>] heeft eenheid en waarde:',o:['10<sup>−7</sup> mol/L','10<sup>−7</sup> mol²/L²','1,0×10<sup>−14</sup> mol/L','1,0×10<sup>−14</sup> mol²/L²'],c:3,e:'Product van twee concentraties → mol²/L². Waarde 10<sup>−14</sup> bij 25°C.'},
{q:'Welk zuur is het zwakste?',o:['HCOOH (K<sub>z</sub>=1,77×10<sup>−4</sup>)','CH<sub>3</sub>COOH (K<sub>z</sub>=1,74×10<sup>−5</sup>)','HClO (K<sub>z</sub>=2,88×10<sup>−8</sup>)','HNO<sub>3</sub> (sterk zuur)'],c:2,e:'Kleinste K<sub>z</sub> = zwakste zuur. HClO heeft de kleinste K<sub>z</sub>-waarde.'},
{q:'Bij pH = 5 is [H<sub>3</sub>O<sup>+</sup>] hoeveel keer groter dan in puur water (pH = 7)?',o:['2×','10×','100×','1000×'],c:2,e:'10<sup>7−5</sup> = 10<sup>2</sup> = 100× — log-schaal.'},
{q:'In een oplossing van NH<sub>4</sub>Cl is de pH:',o:['= 7 (neutraal)','< 7 (zuur)','> 7 (basisch)','Onafhankelijk van [NH<sub>4</sub>Cl]'],c:1,e:'NH<sub>4</sub><sup>+</sup> is conjugaatzuur van zwakke base NH<sub>3</sub> → K<sub>z</sub>(NH<sub>4</sub><sup>+</sup>) = 5,6×10<sup>−10</sup> > 10<sup>−7</sup> → zure hydrolyse → pH < 7.'},
{q:'Een buffer heeft maximale buffercapaciteit als:',o:['[A<sup>−</sup>] = [HA] (pH = pK<sub>z</sub>)','[HA] >> [A<sup>−</sup>]','[A<sup>−</sup>] >> [HA]','pH = 7'],c:0,e:'Bij gelijke concentraties wijkt log(r) het minst af bij toevoeging zuur/base → maximale veerkracht.'},
{q:'Een leerling titreert 20,0 mL HCl met 0,100 M NaOH; verbruik 15,0 mL. c(HCl) is:',o:['0,0750 M','0,100 M','0,150 M','0,133 M'],c:0,e:'c<sub>z</sub>·20 = 0,100·15 → c = 0,0750 M.'},
{q:'Bij gelijke c=0,1 M is de pH-volgorde van laag naar hoog:',o:['HCl < CH<sub>3</sub>COOH < NaCl < NH<sub>3</sub> < NaOH','HCl < NaCl < CH<sub>3</sub>COOH < NH<sub>3</sub> < NaOH','NaOH < NH<sub>3</sub> < NaCl < CH<sub>3</sub>COOH < HCl','HCl < CH<sub>3</sub>COOH < NH<sub>3</sub> < NaCl < NaOH'],c:0,e:'Sterk zuur < zwak zuur < neutraal zout < zwakke base < sterke base. HCl(pH≈1) < CH<sub>3</sub>COOH(2,9) < NaCl(7) < NH<sub>3</sub>(11) < NaOH(13).'},
{q:'K<sub>b</sub> van NH<sub>3</sub> bij gegeven K<sub>z</sub>(NH<sub>4</sub><sup>+</sup>) = 5,6×10<sup>−10</sup>?',o:['1,79×10<sup>−5</sup>','5,6×10<sup>−10</sup>','1,00×10<sup>−7</sup>','1,8×10<sup>−9</sup>'],c:0,e:'K<sub>b</sub>·K<sub>z</sub> = K<sub>w</sub> → K<sub>b</sub> = 10<sup>−14</sup>/5,6×10<sup>−10</sup> = 1,79×10<sup>−5</sup>.'},
{q:'Welk deeltje is NIET amfoter?',o:['HCO<sub>3</sub><sup>−</sup>','H<sub>2</sub>PO<sub>4</sub><sup>−</sup>','HSO<sub>4</sub><sup>−</sup>','CO<sub>3</sub><sup>2−</sup>'],c:3,e:'CO<sub>3</sub><sup>2−</sup> kan H<sup>+</sup> opnemen (→HCO<sub>3</sub><sup>−</sup>) maar bezit geen H om af te staan. De andere drie hebben telkens 1 H + ten minste 1 lading.'},
{q:'Een patiënt met bloed-pH = 7,15 (acidose), pK<sub>z</sub>(H<sub>2</sub>CO<sub>3</sub>)=6,35. Verhouding [HCO<sub>3</sub><sup>−</sup>]/[H<sub>2</sub>CO<sub>3</sub>]?',o:['1,0','6,3','16','25'],c:1,e:'r = 10<sup>(7,15−6,35)</sup> = 10<sup>0,80</sup> = 6,31. Normaal r=20 bij pH=7,65; bij acidose lager.'},
{q:'Bij 100°C is K<sub>w</sub> = 10<sup>−12</sup>. De pH van neutraal water bij 100°C is:',o:['7,0','6,0','8,0','5,0'],c:1,e:'Neutraal: [H<sup>+</sup>]=[OH<sup>−</sup>]=√K<sub>w</sub>=√10<sup>−12</sup>=10<sup>−6</sup> → pH=6. pH=7 alleen bij 25°C.'},
{q:'2,00 g NaOH (M=40) opgelost in 200 mL: de pH is:',o:['12,00','13,40','13,70','14,00'],c:1,e:'c = 0,250 M → pOH = −log(0,250) = 0,60 → pH = 13,40.'},
{q:'Welk zout geeft een basische oplossing?',o:['NH<sub>4</sub>NO<sub>3</sub>','NaCl','Na<sub>2</sub>CO<sub>3</sub>','AlCl<sub>3</sub>'],c:2,e:'CO<sub>3</sub><sup>2−</sup> is geconj. base van zwakke HCO<sub>3</sub><sup>−</sup> → hydrolyseert basisch. NH<sub>4</sub><sup>+</sup> en Al<sup>3+</sup> geven zuur; Na<sup>+</sup>/Cl<sup>−</sup> neutraal.'},
{q:'De pH-sprong bij sterk-sterk titratie is steiler dan bij zwak-sterk omdat:',o:['Sterke zuren ioniseren volledig','Bij EP geen buffering optreedt (geen evenwicht)','Indicator anders is','Temperatuur verschilt'],c:1,e:'Bij zwak-sterk vormt het zout (CH<sub>3</sub>COO<sup>−</sup>) bij verloop van titratie een buffer met overblijvend HA → pH stijgt langzamer rond EP.'},
{q:'Bij verdunning van een zwak zuur:',o:['pH stijgt door minder ionisatie','pH daalt door meer ionisatie','pH blijft constant','pH stijgt: c daalt sneller dan [H<sup>+</sup>] (grotere α)'],c:3,e:'Bij verdunning verschuift evenwicht naar rechts (Le Chatelier) → α stijgt, maar c daalt sterker → [H<sup>+</sup>] daalt → pH stijgt netto.'},
{q:'pK<sub>z</sub> van HCOOH (K<sub>z</sub>=1,77×10<sup>−4</sup>)?',o:['3,75','4,75','5,75','7,75'],c:0,e:'pK<sub>z</sub> = −log(1,77×10<sup>−4</sup>) = 4 − log(1,77) = 4 − 0,248 ≈ 3,75.'},
],
H4:[
{q:'In CrO<sub>4</sub><sup>2−</sup> (chromaat — kleurstof) is het OG van Cr:',o:['+3','+4','+6','+7'],c:2,e:'Cr + 4(−2) = −2 → Cr = +6. Optie d (+7) is veelgemaakte fout (verwarring met dichromaat Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup>).'},
{q:'In een Zn|Zn<sup>2+</sup>(1M)||Cu<sup>2+</sup>(1M)|Cu cel bedraagt U<sub>b</sub>:',o:['−1,10 V','+0,42 V','+1,10 V','+1,42 V'],c:2,e:'U<sub>b</sub> = E<sup>0</sup>(K) − E<sup>0</sup>(A) = +0,34 − (−0,76) = +1,10 V. Optie a is teken-fout; optie b somt E<sup>0</sup>-waarden op.'},
{q:'KRAO betekent:',o:['Kathode=Reductie, Anode=Oxidatie — universeel voor beide celtypes','Kathode=Reductie alleen in galvanisch','Kathode=Oxidatie, Anode=Reductie','Pooltekens zijn altijd identiek'],c:0,e:'KRAO is universeel. Pooltekens (KPAN galvanisch / KNAP elektrolyse) verschillen wel.'},
{q:'Een Zn-Ag batterij (U<sub>b</sub>=+1,56 V) verbruikt 5,00 g Zn (M=65,4; n=2; F=96485). Geleverde energie:',o:['0,12 kJ','12 kJ','23 kJ','46 kJ'],c:2,e:'n(Zn)=0,0764 → n(e<sup>−</sup>)=0,153 → Q=14 743 C → E=Q·U=14 743·1,56 ≈ 23 kJ.'},
{q:'Sterkste reductor uit {Cu, Fe, Zn, Mg, Ag}:',o:['Cu','Fe','Zn','Mg'],c:3,e:'Laagste E<sup>0</sup> = sterkste reductor: Mg (−2,36 V).'},
{q:'Bij elektrolyse van NaCl(aq) ontstaan:',o:['Anode: Cl<sub>2</sub>; Kathode: Na','Anode: O<sub>2</sub>; Kathode: H<sub>2</sub>','Anode: Cl<sub>2</sub>; Kathode: H<sub>2</sub>','Anode: H<sub>2</sub>; Kathode: Cl<sub>2</sub>'],c:2,e:'Anode: Cl<sup>−</sup>→Cl<sub>2</sub>. Kathode: H<sub>2</sub>O wint van Na<sup>+</sup> (E<sup>0</sup>=−2,71V onbereikbaar) → H<sub>2</sub>+OH<sup>−</sup>.'},
{q:'Bij elektrolyse van CuSO<sub>4</sub>(aq): 0,500 A gedurende 60,0 min. Massa Cu afgezet (M=63,5; n=2):',o:['0,148 g','0,296 g','0,593 g','1,19 g'],c:2,e:'Q=0,500·3600=1800 C; n(e<sup>−</sup>)=0,01866; n(Cu)=9,33×10<sup>−3</sup>; m=0,593 g. Optie d komt van vergeten ÷2 (n=2).'},
{q:'In een galvanische cel is de anode:',o:['Positieve pool, plek van reductie','Negatieve pool, plek van oxidatie','Positieve pool, plek van oxidatie','Negatieve pool, plek van reductie'],c:1,e:'Galvanisch: anode = oxidatie (KRAO) + negatief (KPAN). Optie c verwart met elektrolyse.'},
{q:'OG van S in Na<sub>2</sub>S<sub>2</sub>O<sub>3</sub> (thiosulfaat — fixeermiddel in fotografie):',o:['+2 (gemiddeld)','+3','+4','+6'],c:0,e:'2·(+1) + 2·S + 3·(−2) = 0 → 2S = 4 → S = +2 (gemiddeld; in werkelijkheid niet-equivalente S-atomen).'},
{q:'In een Fe-Cu cel is U<sub>b</sub> = +0,78 V. Welk metaal corrodeert?',o:['Cu','Fe','Beide','Geen'],c:1,e:'Fe heeft lager E<sup>0</sup> (−0,44 V) → anode → wordt geoxideerd → corrodeert. Cu is kathode (geconserveerd).'},
{q:'Bij elektrolyse van gesmolten NaCl ontstaat aan de kathode:',o:['Na','H<sub>2</sub>','Cl<sub>2</sub>','O<sub>2</sub>'],c:0,e:'Geen water aanwezig in smelt → Na<sup>+</sup>+e<sup>−</sup>→Na wordt mogelijk. Optie b zou gelden voor waterige oplossing.'},
{q:'Symbolische notatie voor een spontane Cu-Ag cel:',o:['Ag|Ag<sup>+</sup>||Cu<sup>2+</sup>|Cu','Cu|Cu<sup>2+</sup>||Ag<sup>+</sup>|Ag','Ag<sup>+</sup>|Ag||Cu|Cu<sup>2+</sup>','Cu<sup>2+</sup>|Cu||Ag|Ag<sup>+</sup>'],c:1,e:'Anode (lager E<sup>0</sup>: Cu) links; kathode (Ag) rechts. Fasen-volgorde: vast | opl. || opl. | vast.'},
{q:'Bij verzilvering van een lepel via elektrolyse in AgNO<sub>3</sub>: welk poolteken heeft de lepel?',o:['Positief (anode)','Negatief (kathode)','Geen (neutraal)','Wisselt continu'],c:1,e:'Bij galvanisering wordt het object kathode (−); Ag<sup>+</sup> uit oplossing reduceert er op tot Ag-laag.'},
{q:'In een mobiele telefoon-batterij staan 3 identieke cellen in serie voor 4,5 V totaal. U<sub>b</sub> per cel:',o:['1,0 V','1,5 V','3,0 V','4,5 V'],c:1,e:'4,5/3 = 1,5 V per cel (Li-ion).'},
{q:'OG van Mn in MnO<sub>2</sub> (in alkaline batterij):',o:['+2','+4','+6','+7'],c:1,e:'Mn + 2(−2) = 0 → Mn = +4. Optie d (+7) is KMnO<sub>4</sub>.'},
{q:'In een Daniell-cel verzorgt de zoutbrug:',o:['Elektronentransport van anode naar kathode','Elektronentransport van kathode naar anode','Iontransport: anionen naar anode, kationen naar kathode','Iontransport: anionen naar kathode, kationen naar anode'],c:2,e:'Anodecel wordt positiever (Zn<sup>2+</sup> ophoping) → trekt anionen aan. Kathodecel verarmt aan kationen (Cu<sup>2+</sup> verbruikt) → kationen migreren erheen.'},
{q:'In 2Al + 3Cl<sub>2</sub> → 2AlCl<sub>3</sub>: welk element wordt geoxideerd?',o:['Al (0 → +3)','Cl (0 → −1)','Beide','Geen — geen redox'],c:0,e:'Al: 0→+3 (OG stijgt) = oxidatie. Cl: 0→−1 (OG daalt) = reductie. De vraag specifiek: Al is geoxideerd.'},
{q:'Bij galvanisering wordt het object:',o:['Met dunne metaallaag bedekt (object = kathode)','Met dunne metaallaag bedekt (object = anode)','Geoxideerd tot ionen','In oplossing gebracht'],c:0,e:'Galvanisering = elektrolyse waarbij het te bedekken object = kathode. Metaalionen reduceren erop.'},
{q:'Een leerling brengt 5,00 g Fe (M=55,8) in 100 mL 1,0 M CuSO<sub>4</sub>. Theoretische massa Cu afgezet (M=63,5):',o:['5,69 g','6,35 g','8,90 g','12,7 g'],c:0,e:'n(Fe)=0,0896 mol < n(Cu<sup>2+</sup>)=0,100 → Fe limiterend. m(Cu)=0,0896·63,5=5,69 g.'},
{q:'Voor een Zn-Pb cel (E<sup>0</sup>(Zn)=−0,76 V; E<sup>0</sup>(Pb)=−0,13 V) is U<sub>b</sub>:',o:['+0,63 V','−0,63 V','+0,89 V','+0,42 V'],c:0,e:'U<sub>b</sub> = E<sup>0</sup>(K) − E<sup>0</sup>(A) = −0,13 − (−0,76) = +0,63 V.'},
{q:'Voor corrosiebescherming van ijzer is welk metaal voordelig als verteringselektrode?',o:['Cu (edeler)','Sn (vertinning)','Zn (verzinking, offert zich op)','Ag (chemisch inert)'],c:2,e:'Zn (E<sup>0</sup>=−0,76V < E<sup>0</sup>(Fe)=−0,44V) wordt eerst geoxideerd → bescherming. Sn op Fe kán Fe-corrosie versnellen bij beschadiging.'},
{q:'Een pijpleiding van Fe wordt beschermd door Mg-verteringselektrode. Per Mg-atoom geoxideerd: hoeveel Fe-atomen blijven gespaard?',o:['0,5','1','2','3'],c:1,e:'Mg→Mg<sup>2+</sup>+2e<sup>−</sup>. Zonder Mg zou Fe→Fe<sup>2+</sup>+2e<sup>−</sup> dezelfde elektronenstroom leveren → 1 Fe per Mg gespaard.'},
{q:'Bij elektrolyse van water vereist je 1,8 V in praktijk hoewel theoretisch 1,23 V volstaat. Het verschil heet:',o:['Bronspanning','Overpotentiaal','Hoofdspanning','Storing'],c:1,e:'Overpotentiaal: extra spanning nodig wegens kinetische barrières (vooral voor O<sub>2</sub>-vorming aan anode).'},
{q:'Sterkste oxidator uit {Mg<sup>2+</sup>, Zn<sup>2+</sup>, Fe<sup>2+</sup>, Ag<sup>+</sup>}:',o:['Mg<sup>2+</sup>','Zn<sup>2+</sup>','Fe<sup>2+</sup>','Ag<sup>+</sup>'],c:3,e:'Hoogste E<sup>0</sup> = sterkste oxidator: Ag<sup>+</sup>/Ag bij +0,80 V.'},
{q:'In de Hall-Héroult-elektrolyse (Al uit Al<sub>2</sub>O<sub>3</sub>): 100 000 A gedurende 24 uur. Productie (M(Al)=27; n=3; F=96485):',o:['200 kg','400 kg','800 kg','1600 kg'],c:2,e:'Q=8,64×10<sup>9</sup> C; n(e<sup>−</sup>)=89 547 mol; n(Al)=29 849 mol; m≈806 kg.'},
{q:'In 2MnO<sub>4</sub><sup>−</sup>+5H<sub>2</sub>O<sub>2</sub>+6H<sup>+</sup>→2Mn<sup>2+</sup>+5O<sub>2</sub>+8H<sub>2</sub>O. Welk element oxideert?',o:['Mn (+7 → +2)','O in H<sub>2</sub>O<sub>2</sub> (−1 → 0)','S','K'],c:1,e:'O gaat van −1 (H<sub>2</sub>O<sub>2</sub>) naar 0 (O<sub>2</sub>) → OG stijgt = oxidatie. Mn ondergaat reductie.'},
{q:'Welke uitspraak is JUIST?',o:['Galvanisch en elektrolyse produceren beide stroom','In galvanisch is anode positief','Bij elektrolyse is kathode negatief (KNAP)','Reductie gebeurt altijd aan de anode'],c:2,e:'Elektrolyse: KNAP — kathode (−), anode (+). Galvanisch heeft KPAN (kathode +, anode −). Reductie altijd aan kathode (KRAO).'},
{q:'Volgorde Mg, Zn, Cu, Au, Fe van sterkste naar zwakste reductor:',o:['Au > Cu > Fe > Zn > Mg','Mg > Zn > Fe > Cu > Au','Cu > Mg > Au > Zn > Fe','Zn > Mg > Cu > Fe > Au'],c:1,e:'Laagste E<sup>0</sup> eerst (sterkste reductor): Mg(−2,36)>Zn(−0,76)>Fe(−0,44)>Cu(+0,34)>Au(+1,50).'},
{q:'In een Ni-Cu cel (E<sup>0</sup>(Ni)=−0,23V; E<sup>0</sup>(Cu)=+0,34V) gaat 96,5 C lading. Massa Cu afgezet (M=63,5; n=2):',o:['0,016 g','0,032 g','0,063 g','0,127 g'],c:1,e:'n(e<sup>−</sup>)=96,5/96485=1,0×10<sup>−3</sup>; n(Cu)=5,0×10<sup>−4</sup>; m=0,032 g. Optie d vergeet de factor 2 in n=2 e<sup>−</sup>.'},
{q:'Bij balanceren van een redoxreactie in basisch milieu gebruik je voor de ladingsbalans:',o:['H<sup>+</sup>','H<sub>3</sub>O<sup>+</sup>','OH<sup>−</sup>','H<sub>2</sub>O alleen'],c:2,e:'In basisch milieu: OH<sup>−</sup> + H<sub>2</sub>O. In zuur milieu: H<sup>+</sup>/H<sub>3</sub>O<sup>+</sup> + H<sub>2</sub>O.'},
],
};

// ── COMPARISON DATA ───────────────────────────────────────────────────────────
const COMPARE=[
{r:'Energieomzetting',g:'Chemisch → Elektrisch',e:'Elektrisch → Chemisch'},
{r:'Vrijwillig?',g:'Ja (ΔG < 0, U<sub>b</sub> > 0)',e:'Nee (ΔG > 0, externe spanning nodig)'},
{r:'Anode',g:'Oxidatie, negatieve pool (−)',e:'Oxidatie, positieve pool (+)'},
{r:'Kathode',g:'Reductie, positieve pool (+)',e:'Reductie, negatieve pool (−)'},
{r:'Poolteken anode',g:'Negatief (−)',e:'Positief (+)'},
{r:'Stroombron?',g:'Neen — cel IS de bron',e:'Ja — externe spanningsbron vereist'},
{r:'Toepassing',g:'Batterij, brandstofcel',e:'Galvanisering, productie Na/Cl<sub>2</sub>/Al/H<sub>2</sub>'},
];

// ── STAR STYLES (ster-labels) ─────────────────────────────────────────────────
const STAR={
1:{lbl:'★ basis',c:P.faded},
2:{lbl:'★★ uitdagend',c:P.sepia},
3:{lbl:'★★★ expert',c:P.sepia,bold:true},
};

// ── GALVANIC CELL SVG ─────────────────────────────────────────────────────────
function GalvanicCell(){
  return (
    <svg viewBox="0 0 420 260" style={{width:'100%',maxWidth:520,display:'block',margin:'8px auto'}} xmlns="http://www.w3.org/2000/svg">
      {/* External wire */}
      <path d="M 95 70 L 95 35 L 325 35 L 325 70" stroke={P.ink} strokeWidth="1.5" fill="none"/>
      {/* Voltmeter */}
      <circle cx="210" cy="35" r="16" fill={P.paper} stroke={P.ink} strokeWidth="1.5"/>
      <text x="210" y="40" textAnchor="middle" fontFamily={FONT_S} fontSize="14" fill={P.sepia} fontStyle="italic">V</text>
      {/* e- direction label */}
      <text x="160" y="26" textAnchor="middle" fontFamily={FONT_S} fontSize="10" fill={P.sepia} fontStyle="italic">⟵ e⁻</text>
      <text x="260" y="26" textAnchor="middle" fontFamily={FONT_S} fontSize="10" fill={P.sepia} fontStyle="italic">e⁻ ⟶</text>

      {/* Left beaker (anode) */}
      <path d="M 50 80 L 50 215 L 140 215 L 140 80" stroke={P.ink} strokeWidth="1.5" fill="none"/>
      {/* Liquid level */}
      <path d="M 50 110 Q 95 105 140 110 L 140 215 L 50 215 Z" fill={P.paperDark} opacity="0.5"/>
      {/* hatching for liquid */}
      <line x1="55" y1="135" x2="135" y2="135" stroke={P.margin} strokeWidth="0.4" strokeDasharray="2 3"/>
      <line x1="55" y1="160" x2="135" y2="160" stroke={P.margin} strokeWidth="0.4" strokeDasharray="2 3"/>
      <line x1="55" y1="185" x2="135" y2="185" stroke={P.margin} strokeWidth="0.4" strokeDasharray="2 3"/>
      {/* Zn electrode */}
      <rect x="90" y="70" width="10" height="125" fill={P.faded} stroke={P.ink} strokeWidth="1"/>
      <text x="95" y="235" textAnchor="middle" fontFamily={FONT_S} fontSize="11" fill={P.ink}>Zn (−)</text>
      <text x="95" y="248" textAnchor="middle" fontFamily={FONT_S} fontSize="9" fontStyle="italic" fill={P.sepia}>anode · oxidatie</text>
      <text x="95" y="100" textAnchor="middle" fontFamily={FONT_S} fontSize="9" fill={P.margin}>ZnSO₄(aq)</text>

      {/* Right beaker (kathode) */}
      <path d="M 280 80 L 280 215 L 370 215 L 370 80" stroke={P.ink} strokeWidth="1.5" fill="none"/>
      <path d="M 280 110 Q 325 105 370 110 L 370 215 L 280 215 Z" fill={P.paperDark} opacity="0.5"/>
      <line x1="285" y1="135" x2="365" y2="135" stroke={P.margin} strokeWidth="0.4" strokeDasharray="2 3"/>
      <line x1="285" y1="160" x2="365" y2="160" stroke={P.margin} strokeWidth="0.4" strokeDasharray="2 3"/>
      <line x1="285" y1="185" x2="365" y2="185" stroke={P.margin} strokeWidth="0.4" strokeDasharray="2 3"/>
      {/* Cu electrode */}
      <rect x="320" y="70" width="10" height="125" fill={P.sepia} stroke={P.ink} strokeWidth="1"/>
      <text x="325" y="235" textAnchor="middle" fontFamily={FONT_S} fontSize="11" fill={P.ink}>Cu (+)</text>
      <text x="325" y="248" textAnchor="middle" fontFamily={FONT_S} fontSize="9" fontStyle="italic" fill={P.sepia}>kathode · reductie</text>
      <text x="325" y="100" textAnchor="middle" fontFamily={FONT_S} fontSize="9" fill={P.margin}>CuSO₄(aq)</text>

      {/* Salt bridge */}
      <path d="M 140 95 L 140 75 L 280 75 L 280 95" stroke={P.ink} strokeWidth="1.5" fill="none"/>
      <path d="M 140 95 L 280 95" stroke={P.ink} strokeWidth="1.5" strokeDasharray="0" fill="none"/>
      <text x="210" y="68" textAnchor="middle" fontFamily={FONT_S} fontSize="10" fontStyle="italic" fill={P.sepia}>zoutbrug · KNO₃</text>

      {/* Animated electrons in external wire */}
      <circle r="2.6" fill={P.sepia}>
        <animateMotion dur="2.4s" repeatCount="indefinite" path="M 95 70 L 95 35 L 325 35 L 325 70"/>
      </circle>
      <circle r="2.6" fill={P.sepia}>
        <animateMotion dur="2.4s" begin="0.4s" repeatCount="indefinite" path="M 95 70 L 95 35 L 325 35 L 325 70"/>
      </circle>
      <circle r="2.6" fill={P.sepia}>
        <animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite" path="M 95 70 L 95 35 L 325 35 L 325 70"/>
      </circle>
      <circle r="2.6" fill={P.sepia}>
        <animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite" path="M 95 70 L 95 35 L 325 35 L 325 70"/>
      </circle>
      <circle r="2.6" fill={P.sepia}>
        <animateMotion dur="2.4s" begin="1.6s" repeatCount="indefinite" path="M 95 70 L 95 35 L 325 35 L 325 70"/>
      </circle>
      <circle r="2.6" fill={P.sepia}>
        <animateMotion dur="2.4s" begin="2.0s" repeatCount="indefinite" path="M 95 70 L 95 35 L 325 35 L 325 70"/>
      </circle>

      {/* Salt bridge ions */}
      <circle r="2" fill={P.ink} opacity="0.6">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 280 85 L 140 85"/>
      </circle>
      <circle r="2" fill={P.ink} opacity="0.6">
        <animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" path="M 140 90 L 280 90"/>
      </circle>

      {/* Ion movement in solutions */}
      <circle r="1.8" fill={P.sepia} opacity="0.5">
        <animateMotion dur="4s" repeatCount="indefinite" path="M 95 195 Q 110 170 95 145 Q 80 170 95 195"/>
      </circle>
      <circle r="1.8" fill={P.sepia} opacity="0.5">
        <animateMotion dur="4s" begin="2s" repeatCount="indefinite" path="M 325 195 Q 340 170 325 145 Q 310 170 325 195"/>
      </circle>
    </svg>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function App() {
  const [course, setCourse] = useState('CHE2');
  const [screen, setScreen] = useState('home');
  const [chId, setChId] = useState(null);
  const [secId, setSecId] = useState(null);
  const [open, setOpen] = useState({});
  const [stepsOpen, setStepsOpen] = useState(false);
  const [secTab, setSecTab] = useState('theorie');
  const [ts, setTs] = useState(null);
  const [particles, setParticles] = useState([]);

  // Particle effect on screen change
  useEffect(()=>{
    const baseId = Date.now();
    const newParticles = Array.from({length:24},(_,i)=>{
      const angle = Math.random()*Math.PI*2;
      const dist = 40 + Math.random()*180;
      return {
        id:baseId+i,
        dx:Math.cos(angle)*dist,
        dy:Math.sin(angle)*dist,
        size:1.5+Math.random()*3,
        delay:Math.random()*120,
        rot:Math.random()*360,
      };
    });
    setParticles(newParticles);
    const t = setTimeout(()=>setParticles([]),1000);
    return ()=>clearTimeout(t);
  },[screen,secId,chId]);

  const secs = chId ? SEC[chId] : [];
  const sec = secs.find(s => s.id === secId) || null;

  const toggle = k => setOpen(o => ({...o,[k]:!o[k]}));

  const goHome = () => setScreen('home');
  const goChap = id => { setChId(id); setScreen('chapter'); };
  const goSec = (cid, sid) => { setChId(cid); setSecId(sid); setOpen({}); setStepsOpen(false); setSecTab('theorie'); setScreen('section'); };
  const goForm = id => { setChId(id); setScreen('formularium'); };
  const goComp = () => setScreen('compare');
  const goTest = id => {
    const qs = [...TQ[id]].sort(() => Math.random()-0.5).slice(0,5);
    setTs({qs, cur:0, att:0, sel:null, fb:null, res:[]});
    setChId(id); setScreen('test');
  };

  const testSel = i => { if (ts.fb==='ok'||ts.fb==='w2') return; setTs(p=>({...p,sel:i})); };
  const testCheck = () => {
    if (ts.sel===null||ts.fb==='ok'||ts.fb==='w2') return;
    const q = ts.qs[ts.cur];
    if (ts.sel===q.c) { setTs(p=>({...p, fb:'ok', res:[...p.res,{correct:true,q,sel:p.sel}]})); }
    else if (ts.att===0) { setTs(p=>({...p, fb:'w1', att:1, sel:null})); }
    else { setTs(p=>({...p, fb:'w2', res:[...p.res,{correct:false,q,sel:p.sel}]})); }
  };
  const testNext = () => {
    if (ts.cur===4) { setTs(p=>({...p,fb:'done'})); }
    else { setTs(p=>({...p,cur:p.cur+1,att:0,sel:null,fb:null})); }
  };

  const chapTitle = chId==='H3' ? 'Zuren en Basen' : 'Redoxevenwichten';

  // ── STYLES ────────────────────────────────────────────────
  const root = {
    minHeight:'100dvh',height:'100dvh',
    background:P.paper,
    backgroundImage:`radial-gradient(circle at 20% 20%, ${P.paperLight} 0%, transparent 60%), radial-gradient(circle at 80% 80%, ${P.paperLight} 0%, transparent 50%)`,
    fontFamily:FONT_S,
    display:'flex',flexDirection:'column',overflow:'hidden',
    color:P.ink,fontSize:15,position:'relative',
  };
  const headerBar = {
    padding:'10px 16px 8px',
    flexShrink:0,
    display:'flex',flexDirection:'column',alignItems:'center',gap:2,
    borderBottom:`3px double ${P.rule}`,
    background:P.paper,
    position:'relative',
  };
  const body = {flex:1,overflowY:'auto',padding:'14px 18px 36px',position:'relative'};

  // Double-rule section header
  const doubleHeader = (num,title) => (
    <div style={{margin:'10px 0 14px',textAlign:'center'}}>
      <div style={{borderTop:`1px solid ${P.rule}`,borderBottom:`1px solid ${P.rule}`,height:3,marginBottom:8}} />
      <div style={{fontFamily:FONT_S,fontSize:14,letterSpacing:1.5,textTransform:'uppercase',color:P.ink,fontWeight:700}}>
        <span style={{color:P.sepia,fontStyle:'italic',fontWeight:400,marginRight:6}}>§ {num}</span>
        {title}
      </div>
      <div style={{borderTop:`1px solid ${P.rule}`,borderBottom:`1px solid ${P.rule}`,height:3,marginTop:8}} />
    </div>
  );

  // Subheader (smaller, single rule with caps)
  const subHeader = label => (
    <div style={{margin:'18px 0 8px',display:'flex',alignItems:'center',gap:10}}>
      <span style={{fontFamily:FONT_S,fontSize:10,letterSpacing:3,textTransform:'uppercase',color:P.sepia,fontWeight:700,fontStyle:'italic'}}>— {label} —</span>
      <div style={{flex:1,borderTop:`1px solid ${P.margin}`,opacity:0.5}}/>
    </div>
  );

  const btn = (active=false,sm=false) => ({
    background:active?P.ink:'transparent',
    color:active?P.paper:P.ink,
    border:`1px solid ${P.rule}`,
    borderRadius:0,
    padding:sm?'5px 10px':'8px 14px',
    fontSize:sm?12:13,
    fontFamily:FONT_S,
    fontWeight:500,
    letterSpacing:0.5,
    cursor:'pointer',
    textTransform:'uppercase',
    minHeight:sm?28:36,
    display:'inline-flex',alignItems:'center',justifyContent:'center',gap:6,
  });

  // ── KEYFRAMES & GLOBAL STYLES ────────────────────────────
  const styleTag = (
    <style>{`
      @keyframes inkSplat {
        0%   { transform: translate(0,0) scale(1) rotate(0deg); opacity: 0.85; }
        70%  { opacity: 0.5; }
        100% { transform: translate(var(--dx), var(--dy)) scale(0.2) rotate(var(--rot)); opacity: 0; }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(6px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .ink-particle { animation: inkSplat 0.95s cubic-bezier(.2,.7,.4,1) forwards; }
      .paper-fade   { animation: fadeIn 0.45s ease-out both; }
      body { background: ${P.paper}; }
      *::-webkit-scrollbar { width: 8px; }
      *::-webkit-scrollbar-track { background: ${P.paper}; }
      *::-webkit-scrollbar-thumb { background: ${P.margin}; border-radius: 0; }
    `}</style>
  );

  const particlesLayer = (
    <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:50,overflow:'hidden'}}>
      {particles.map(p=>(
        <span key={p.id} className="ink-particle" style={{
          position:'absolute',left:'50%',top:'50%',
          width:p.size,height:p.size,borderRadius:'50%',
          background:P.sepia,
          ['--dx']:`${p.dx}px`,
          ['--dy']:`${p.dy}px`,
          ['--rot']:`${p.rot}deg`,
          animationDelay:`${p.delay}ms`,
        }}/>
      ))}
    </div>
  );

  // School-header masthead
  const masthead = (
    <div style={headerBar}>
      <div style={{fontFamily:FONT_S,fontSize:10,letterSpacing:4,textTransform:'uppercase',color:P.sepia,fontStyle:'italic'}}>
        Sint-Jozefscollege · Aarschot
      </div>
      <div style={{fontFamily:FONT_S,fontSize:18,fontWeight:700,letterSpacing:2,color:P.ink,marginTop:1}}>
        SJCA <span style={{color:P.sepia,fontWeight:400}}>·</span> Chemie 6<sup>e</sup> middelbaar
      </div>
      <div style={{fontFamily:FONT_S,fontSize:10,fontStyle:'italic',color:P.faded,letterSpacing:1.5,marginTop:1}}>
        — Vol. I, no. 1 · anno {new Date().getFullYear()} —
      </div>
    </div>
  );

  // ── HOME ──────────────────────────────────────────────────
  if (screen==='home') return (
    <div style={root}>
      {styleTag}{particlesLayer}
      {masthead}
      <div style={body} className="paper-fade">
        <div style={{textAlign:'center',marginTop:8,marginBottom:16}}>
          <div style={{fontStyle:'italic',color:P.faded,fontSize:13,letterSpacing:0.5}}>
            een verhandeling over zuren, basen en redoxevenwichten
          </div>
        </div>

        {doubleHeader('','Inhoudstafel')}

        <div style={{display:'flex',gap:6,justifyContent:'center',margin:'10px 0 18px'}}>
          {['CHE1','CHE2'].map(c=>(
            <button key={c} onClick={()=>setCourse(c)} style={btn(course===c,true)}>{c}</button>
          ))}
        </div>
        <div style={{textAlign:'center',color:P.faded,fontSize:12,fontStyle:'italic',marginBottom:18}}>
          {course==='CHE1'?'CHE1 — enkele secties zijn enkel in CHE2 beschikbaar':'CHE2 — alle secties beschikbaar'}
        </div>

        {[
          {id:'H3',roman:'Caput I',t:'Zuren en Basen',sym:'⚗'},
          {id:'H4',roman:'Caput II',t:'Redoxevenwichten',sym:'⚡'},
        ].map(ch=>{
          const n = SEC[ch.id].filter(s=>course==='CHE2'||s.c1).length;
          return (
            <div key={ch.id} onClick={()=>goChap(ch.id)} style={{
              cursor:'pointer',
              border:`1px solid ${P.rule}`,
              borderTop:`3px double ${P.rule}`,
              borderBottom:`3px double ${P.rule}`,
              padding:'18px 16px',
              marginBottom:14,
              background:P.paperLight,
              position:'relative',
            }}>
              <div style={{position:'absolute',top:6,right:10,fontSize:10,fontStyle:'italic',color:P.sepia,letterSpacing:1}}>
                {ch.roman}
              </div>
              <div style={{display:'flex',alignItems:'center',gap:14}}>
                <span style={{fontSize:32,color:P.sepia,fontFamily:FONT_S}}>{ch.sym}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:22,fontWeight:700,color:P.ink,letterSpacing:0.5}}>{ch.t}</div>
                  <div style={{fontSize:12,color:P.faded,fontStyle:'italic',marginTop:4,letterSpacing:0.5}}>
                    {n} secties · formularium · vraagstelling (5 items)
                  </div>
                </div>
                <span style={{color:P.sepia,fontSize:20,fontStyle:'italic'}}>›</span>
              </div>
            </div>
          );
        })}

        <div style={{marginTop:24,padding:14,border:`1px solid ${P.margin}`,borderTop:`3px double ${P.margin}`,fontSize:11,fontStyle:'italic',color:P.faded,lineHeight:1.8,textAlign:'center'}}>
          ❦ &nbsp; Studeer met aandacht. Verifieer elk antwoord. &nbsp; ❦
        </div>
      </div>
    </div>
  );

  // ── CHAPTER ──────────────────────────────────────────────
  if (screen==='chapter') return (
    <div style={root}>
      {styleTag}{particlesLayer}
      {masthead}
      <div style={{padding:'8px 16px',display:'flex',alignItems:'center',gap:10,borderBottom:`1px solid ${P.margin}`,background:P.paper,flexShrink:0}}>
        <button onClick={goHome} style={btn(false,true)}>← Inhoudstafel</button>
        <span style={{flex:1,textAlign:'right',fontSize:11,letterSpacing:2,textTransform:'uppercase',color:P.sepia,fontStyle:'italic'}}>{chId==='H3'?'Caput I':'Caput II'}</span>
      </div>
      <div style={body} className="paper-fade">
        {doubleHeader('',chapTitle)}

        {secs.map(s=>{
          const locked = course==='CHE1' && !s.c1;
          return (
            <div key={s.id} onClick={()=>!locked&&goSec(chId,s.id)} style={{
              display:'flex',alignItems:'baseline',gap:14,
              padding:'12px 6px',
              borderBottom:`1px dotted ${P.margin}`,
              cursor:locked?'default':'pointer',
              opacity:locked?0.45:1,
            }}>
              <span style={{fontFamily:FONT_M,fontSize:13,color:P.sepia,minWidth:42,fontWeight:700}}>§ {s.id}</span>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:15,color:P.ink,letterSpacing:0.3}}>{s.t}</div>
                <div style={{fontStyle:'italic',color:P.faded,fontSize:12,marginTop:1}} dangerouslySetInnerHTML={{__html:s.sub}} />
              </div>
              {locked && <span style={{fontSize:10,fontStyle:'italic',color:P.faded,letterSpacing:1}}>CHE2 only</span>}
              {!locked && <span style={{color:P.sepia,fontSize:14}}>›</span>}
            </div>
          );
        })}

        {chId==='H4' && course==='CHE2' && (
          <div onClick={goComp} style={{
            marginTop:16,padding:'12px 14px',
            border:`1px solid ${P.rule}`,
            borderTop:`3px double ${P.rule}`,
            borderBottom:`3px double ${P.rule}`,
            background:P.paperLight,
            cursor:'pointer',display:'flex',alignItems:'center',gap:12,
          }}>
            <span style={{fontSize:18,color:P.sepia}}>⚔</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:600,fontSize:14}}>Galvanisch vs Elektrolytisch</div>
              <div style={{fontStyle:'italic',fontSize:11,color:P.faded}}>Vergelijkende tabel — appendix</div>
            </div>
            <span style={{color:P.sepia}}>›</span>
          </div>
        )}

        {subHeader('Hulpstukken')}
        <div onClick={()=>goForm(chId)} style={{
          padding:'12px 14px',
          border:`1px solid ${P.rule}`,
          background:P.paperLight,
          cursor:'pointer',display:'flex',alignItems:'center',gap:12,marginBottom:8,
        }}>
          <span style={{fontSize:18,color:P.sepia}}>📐</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:600,fontSize:14}}>Formularium</div>
            <div style={{fontStyle:'italic',fontSize:11,color:P.faded}}>Formules en tabellen</div>
          </div>
          <span style={{color:P.sepia}}>›</span>
        </div>
        <div onClick={()=>goTest(chId)} style={{
          padding:'12px 14px',
          border:`1px solid ${P.rule}`,
          background:P.paperLight,
          cursor:'pointer',display:'flex',alignItems:'center',gap:12,
        }}>
          <span style={{fontSize:18,color:P.sepia}}>✎</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:600,fontSize:14}}>Vraagstelling</div>
            <div style={{fontStyle:'italic',fontSize:11,color:P.faded}}>Vijf willekeurige vragen ter toetsing</div>
          </div>
          <span style={{color:P.sepia}}>›</span>
        </div>
      </div>
    </div>
  );

  // ── SECTION ──────────────────────────────────────────────
  if (screen==='section' && sec) return (
    <div style={root}>
      {styleTag}{particlesLayer}
      {masthead}
      <div style={{padding:'8px 16px',display:'flex',alignItems:'center',gap:10,borderBottom:`1px solid ${P.margin}`,background:P.paper,flexShrink:0}}>
        <button onClick={()=>goChap(chId)} style={btn(false,true)}>← {chapTitle}</button>
        <span style={{flex:1,textAlign:'right',fontSize:11,letterSpacing:2,textTransform:'uppercase',color:P.sepia,fontStyle:'italic'}}>§ {sec.id}</span>
      </div>
      <div style={body} className="paper-fade">
        {doubleHeader(sec.id,sec.t)}

        <div style={{textAlign:'center',fontStyle:'italic',color:P.faded,fontSize:13,marginBottom:14,letterSpacing:0.3}}
          dangerouslySetInnerHTML={{__html:sec.sub}}/>

        {/* Tab toggle — Theorie | Samenvatting */}
        <div style={{display:'flex',justifyContent:'center',gap:0,marginBottom:14,borderBottom:`3px double ${P.rule}`,paddingBottom:6}}>
          {[
            {id:'theorie',lbl:'Theorie'},
            {id:'samenvatting',lbl:'Samenvatting'},
          ].map(t=>{
            const active = secTab===t.id;
            return (
              <button key={t.id} onClick={()=>setSecTab(t.id)} style={{
                background:active?P.ink:'transparent',
                color:active?P.paper:P.ink,
                border:`1px solid ${P.rule}`,
                borderRadius:0,
                padding:'6px 18px',
                fontSize:11,
                fontFamily:FONT_S,
                fontWeight:500,
                letterSpacing:2,
                textTransform:'uppercase',
                cursor:'pointer',
                minHeight:32,
                marginRight:t.id==='theorie'?-1:0,
              }}>{t.lbl}</button>
            );
          })}
        </div>

        {secTab==='samenvatting' ? (
          <>
            {/* Abstract box */}
            <div style={{
              border:`1px solid ${P.rule}`,
              borderTop:`3px double ${P.rule}`,
              borderBottom:`3px double ${P.rule}`,
              background:P.paperLight,
              padding:'14px 18px',marginBottom:14,
              position:'relative',
            }}>
              <div style={{
                position:'absolute',top:-9,left:18,
                background:P.paper,padding:'0 8px',
                fontStyle:'italic',fontSize:11,color:P.sepia,letterSpacing:2,textTransform:'uppercase',
              }}>— Abstract —</div>
              {(SUMM[sec.id]||[]).map((b,i)=>(
                <div key={i} style={{display:'flex',gap:10,marginBottom:i<SUMM[sec.id].length-1?8:0,fontSize:13.5,lineHeight:1.7}}>
                  <span style={{color:P.sepia,flexShrink:0,fontWeight:700,fontFamily:FONT_M}}>▸</span>
                  <span dangerouslySetInnerHTML={{__html:b}}/>
                </div>
              ))}
            </div>
            <div style={{textAlign:'center',fontStyle:'italic',color:P.faded,fontSize:11,letterSpacing:1.5}}>
              Voor de uitgebreide bespreking: schakel naar <b>Theorie</b>.
            </div>
          </>
        ) : (
        <>
        {/* Extended theory paragraph */}
        {TH_EXT[sec.id] && (
          <p style={{
            fontSize:14,lineHeight:1.75,textAlign:'justify',
            textIndent:'1.4em',margin:'0 0 14px',color:P.ink,
          }} dangerouslySetInnerHTML={{__html:TH_EXT[sec.id]}}/>
        )}

        {/* Theorie bullets — expanded (course-aligned) or fallback */}
        {subHeader('Kernpunten')}
        <div style={{paddingLeft:6}}>
          {(TH_BULLETS[sec.id]||sec.th).map((b,i)=>{
            const numerals = ['i.','ii.','iii.','iv.','v.','vi.','vii.','viii.','ix.','x.','xi.','xii.'];
            return (
              <div key={i} style={{display:'flex',gap:10,marginBottom:8,fontSize:13.5,lineHeight:1.65}}>
                <span style={{color:P.sepia,flexShrink:0,fontWeight:700,fontFamily:FONT_S,minWidth:24}}>{numerals[i]||'·'}</span>
                <span dangerouslySetInnerHTML={{__html:b}}/>
              </div>
            );
          })}
        </div>

        {/* KRAO + KPAN/KNAP Nota Bene for §4.1 and §4.2 */}
        {(sec.id==='4.1' || sec.id==='4.2') && (
          <>
            {subHeader('Nota Bene — pool- & elektrodewetten')}
            {[KRAO,KPAN,KNAP].map((nb,i)=>(
              <div key={i} style={{
                border:`1.5px solid ${P.sepia}`,
                borderTop:`3px double ${P.sepia}`,
                background:P.paperLight,
                padding:'12px 16px',marginBottom:10,
                position:'relative',
              }}>
                <div style={{
                  fontStyle:'italic',fontSize:10,color:P.sepia,letterSpacing:2,
                  textTransform:'uppercase',marginBottom:6,
                }}>
                  Nota Bene — {nb.title}
                </div>
                <div style={{fontFamily:FONT_M,fontSize:14,color:P.ink,marginBottom:6,lineHeight:1.5}}
                  dangerouslySetInnerHTML={{__html:nb.rule}}/>
                <div style={{fontSize:12.5,lineHeight:1.6,color:P.faded,fontStyle:'italic'}}
                  dangerouslySetInnerHTML={{__html:nb.detail}}/>
              </div>
            ))}
          </>
        )}

        {/* Galvanic cell SVG for 4.4 */}
        {sec.id==='4.4' && (
          <>
            {subHeader('Schema — galvanische cel')}
            <div style={{
              border:`1px solid ${P.margin}`,
              background:P.paperLight,
              padding:'12px 8px 8px',
            }}>
              <GalvanicCell/>
              <div style={{textAlign:'center',fontStyle:'italic',fontSize:11,color:P.faded,marginTop:6,letterSpacing:0.4}}>
                Fig. 1 — Daniell-cel: Zn-anode (−) en Cu-kathode (+), verbonden via externe geleider en zoutbrug.
              </div>
            </div>
          </>
        )}

        {/* Formules */}
        {subHeader('Formules')}
        <div style={{
          fontFamily:FONT_M,fontSize:13,lineHeight:1.9,
          background:P.paperLight,
          border:`1px solid ${P.margin}`,
          padding:'10px 14px',
          color:P.ink,
        }} dangerouslySetInnerHTML={{__html:sec.fm.replace(/\n/g,'<br>')}}/>

        {/* § Methode (uitklapbaar stappenplan) */}
        {STEPS[sec.id] && (
          <>
            {subHeader('§ Methode')}
            <div style={{border:`1px solid ${P.margin}`,background:P.paperLight}}>
              <div onClick={()=>setStepsOpen(o=>!o)} style={{
                padding:'10px 14px',cursor:'pointer',
                display:'flex',alignItems:'center',gap:10,
                borderBottom:stepsOpen?`1px solid ${P.margin}`:'none',
              }}>
                <span style={{color:P.sepia,fontStyle:'italic',fontSize:13,fontWeight:600,letterSpacing:0.5,flex:1}}>
                  Stappenplan voor de oefeningen
                </span>
                <span style={{color:P.sepia,fontSize:14,fontFamily:FONT_M}}>{stepsOpen?'▾':'▸'}</span>
              </div>
              {stepsOpen && (
                <div style={{padding:'10px 14px 14px'}}>
                  <ol style={{margin:0,padding:'0 0 0 20px',fontSize:13,lineHeight:1.7,color:P.ink}}>
                    {STEPS[sec.id].map((s,i)=>{
                      const circled = ['①','②','③','④','⑤','⑥','⑦'][i];
                      return (
                        <li key={i} style={{listStyle:'none',marginBottom:8,paddingLeft:4}}>
                          <span style={{color:P.sepia,fontFamily:FONT_M,fontWeight:700,marginRight:8}}>{circled}</span>
                          <span dangerouslySetInnerHTML={{__html:s}}/>
                        </li>
                      );
                    })}
                  </ol>

                  {/* KRAO/KPAN/KNAP repetitie voor galvanische cel en elektrolyse */}
                  {(sec.id==='4.4' || sec.id==='4.5') && (
                    <div style={{
                      marginTop:14,paddingTop:12,
                      borderTop:`1px dotted ${P.margin}`,
                    }}>
                      <div style={{fontStyle:'italic',fontSize:10,color:P.sepia,letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>
                        — Nota Bene — onthouden bij elke oefening —
                      </div>
                      {[KRAO, sec.id==='4.4'?KPAN:KNAP].map((nb,i)=>(
                        <div key={i} style={{
                          border:`1px solid ${P.sepia}`,
                          background:P.paper,
                          padding:'8px 12px',marginBottom:8,
                        }}>
                          <div style={{fontStyle:'italic',fontSize:10,color:P.sepia,letterSpacing:1.5,textTransform:'uppercase',marginBottom:4}}>
                            {nb.title}
                          </div>
                          <div style={{fontFamily:FONT_M,fontSize:13,color:P.ink,lineHeight:1.5}}
                            dangerouslySetInnerHTML={{__html:nb.rule}}/>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
        </>
        )}

        {/* Oefeningen */}
        {subHeader('Oefeningen')}
        {sec.exo.map((ex,i)=>{
          const k=`${chId}_${sec.id}_${i}`;
          const isOpen=open[k];
          const st=STAR[ex.s];
          return (
            <div key={k} style={{
              borderTop:`1px solid ${P.margin}`,
              borderBottom:`1px solid ${P.margin}`,
              padding:'12px 4px',marginBottom:10,
              background:P.paperLight,
              paddingLeft:14,paddingRight:14,
            }}>
              <div style={{display:'flex',alignItems:'baseline',gap:10,marginBottom:6}}>
                <span style={{fontFamily:FONT_M,fontSize:11,color:P.faded,fontWeight:700}}>nr. {i+1}.</span>
                <span style={{fontStyle:'italic',fontSize:11,color:st.c,letterSpacing:0.5,fontWeight:st.bold?700:500}}>{st.lbl}</span>
              </div>
              <div style={{fontSize:13.5,lineHeight:1.7,marginBottom:10,color:P.ink}}
                dangerouslySetInnerHTML={{__html:ex.q}}/>
              <button onClick={()=>toggle(k)} style={{
                background:'transparent',
                color:P.sepia,
                border:`1px solid ${P.sepia}`,
                borderRadius:0,
                padding:'6px 12px',
                fontSize:11,
                fontFamily:FONT_S,
                fontStyle:'italic',
                letterSpacing:1,
                textTransform:'uppercase',
                cursor:'pointer',
                width:'100%',textAlign:'center',
              }}>
                {isOpen?'— verberg oplossing —':'— toon oplossing —'}
              </button>
              {isOpen && (
                <div style={{
                  marginTop:10,padding:'10px 12px',
                  background:P.paper,
                  border:`1px solid ${P.margin}`,
                  borderLeft:`3px double ${P.sepia}`,
                  fontSize:13,lineHeight:1.75,color:P.ink,
                }} dangerouslySetInnerHTML={{__html:ex.a}}/>
              )}
            </div>
          );
        })}

        <div style={{textAlign:'center',marginTop:20,fontStyle:'italic',color:P.faded,fontSize:11,letterSpacing:2}}>
          ❦ &nbsp; einde van §{sec.id} &nbsp; ❦
        </div>
      </div>
    </div>
  );

  // ── FORMULARIUM ──────────────────────────────────────────
  if (screen==='formularium') {
    const fd = FORM[chId];
    return (
      <div style={root}>
        {styleTag}{particlesLayer}
        {masthead}
        <div style={{padding:'8px 16px',display:'flex',alignItems:'center',gap:10,borderBottom:`1px solid ${P.margin}`,background:P.paper,flexShrink:0}}>
          <button onClick={()=>goChap(chId)} style={btn(false,true)}>← {chapTitle}</button>
          <span style={{flex:1,textAlign:'right',fontSize:11,letterSpacing:2,textTransform:'uppercase',color:P.sepia,fontStyle:'italic'}}>Appendix · Formularium</span>
        </div>
        <div style={body} className="paper-fade">
          {doubleHeader('App.',`Formularium — ${chapTitle}`)}

          {subHeader('Formules')}
          <div style={{border:`1px solid ${P.margin}`,background:P.paperLight,padding:'4px 0'}}>
            {fd.fmls.map((f,i)=>(
              <div key={i} style={{
                display:'flex',alignItems:'baseline',gap:12,
                padding:'8px 14px',
                borderBottom:i<fd.fmls.length-1?`1px dotted ${P.margin}`:'none',
              }}>
                <span style={{fontStyle:'italic',color:P.sepia,fontSize:12,minWidth:110,flexShrink:0}}>{f.n}</span>
                <span style={{fontFamily:FONT_M,fontSize:13,color:P.ink}} dangerouslySetInnerHTML={{__html:f.f}}/>
              </div>
            ))}
          </div>

          {fd.tabs.map((tab,ti)=>(
            <div key={ti}>
              {subHeader(tab.title.replace(/<[^>]+>/g,''))}
              <div style={{overflowX:'auto',border:`1px solid ${P.margin}`,background:P.paperLight}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:13,fontFamily:FONT_S}}>
                  <thead>
                    <tr>{tab.heads.map((h,hi)=>(
                      <th key={hi} style={{
                        textAlign:'left',padding:'8px 12px',
                        borderBottom:`3px double ${P.rule}`,
                        background:P.paperDark,
                        color:P.ink,fontStyle:'italic',fontWeight:700,fontSize:12,letterSpacing:0.5,
                      }} dangerouslySetInnerHTML={{__html:h}}/>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {tab.rows.map((row,ri)=>(
                      <tr key={ri}>
                        {row.map((cell,ci)=>(
                          <td key={ci} style={{
                            padding:'7px 12px',
                            borderBottom:`1px dotted ${P.margin}`,
                            fontFamily:ci===0?FONT_S:FONT_M,
                            color:P.ink,
                          }} dangerouslySetInnerHTML={{__html:cell}}/>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {subHeader('Gebruik van de tabellen')}
          <p style={{
            fontSize:13,lineHeight:1.75,textAlign:'justify',
            textIndent:'1.4em',
            border:`1px solid ${P.margin}`,
            borderLeft:`3px double ${P.sepia}`,
            background:P.paperLight,
            padding:'10px 14px',margin:0,
          }} dangerouslySetInnerHTML={{__html:fd.usage}}/>
        </div>
      </div>
    );
  }

  // ── TEST ─────────────────────────────────────────────────
  if (screen==='test' && ts) {
    // Resultaat
    if (ts.fb==='done') {
      const score = ts.res.filter(r=>r.correct).length;
      const verdict = score===5?'Eximia cum laude — perfect!':score>=4?'Magna cum laude — uitstekend!':score>=3?'Cum laude — goed werk!':'Satisfecit — verdere studie aangewezen.';
      return (
        <div style={root}>
          {styleTag}{particlesLayer}
          {masthead}
          <div style={{padding:'8px 16px',display:'flex',alignItems:'center',gap:10,borderBottom:`1px solid ${P.margin}`,background:P.paper,flexShrink:0}}>
            <button onClick={()=>goChap(chId)} style={btn(false,true)}>← {chapTitle}</button>
            <span style={{flex:1,textAlign:'right',fontSize:11,letterSpacing:2,textTransform:'uppercase',color:P.sepia,fontStyle:'italic'}}>Resultaat</span>
          </div>
          <div style={body} className="paper-fade">
            {doubleHeader('','Beoordeling')}
            <div style={{
              textAlign:'center',padding:'18px 16px',
              border:`1px solid ${P.rule}`,
              borderTop:`3px double ${P.rule}`,
              borderBottom:`3px double ${P.rule}`,
              background:P.paperLight,marginBottom:18,
            }}>
              <div style={{fontFamily:FONT_M,fontSize:48,fontWeight:700,color:P.sepia,letterSpacing:2}}>{score}/5</div>
              <div style={{fontStyle:'italic',color:P.faded,fontSize:13,marginTop:6,letterSpacing:0.5}}>{verdict}</div>
            </div>

            {subHeader('Overzicht')}
            {ts.res.map((r,i)=>(
              <div key={i} style={{
                border:`1px solid ${P.margin}`,
                borderLeft:`3px double ${r.correct?P.ok:P.err}`,
                background:r.correct?P.okBg:P.errBg,
                padding:'10px 14px',marginBottom:8,
              }}>
                <div style={{display:'flex',gap:8,alignItems:'baseline',marginBottom:4}}>
                  <span style={{fontFamily:FONT_M,fontSize:13,color:r.correct?P.ok:P.err,fontWeight:700}}>{r.correct?'✓':'✗'}</span>
                  <span style={{fontFamily:FONT_M,fontSize:11,color:P.faded}}>vraag {i+1}.</span>
                </div>
                <div style={{fontSize:13,lineHeight:1.6,marginBottom:4}} dangerouslySetInnerHTML={{__html:r.q.q}}/>
                {!r.correct && (
                  <>
                    <div style={{fontSize:12,color:P.err,marginBottom:2}}><i>Uw antwoord:</i> <span dangerouslySetInnerHTML={{__html:r.q.o[r.sel]}}/></div>
                    <div style={{fontSize:12,color:P.ok,marginBottom:2}}><i>Juist:</i> <span dangerouslySetInnerHTML={{__html:r.q.o[r.q.c]}}/></div>
                    <div style={{fontSize:12,color:P.faded,fontStyle:'italic',marginTop:4}} dangerouslySetInnerHTML={{__html:r.q.e}}/>
                  </>
                )}
              </div>
            ))}

            <div style={{display:'flex',gap:8,marginTop:14}}>
              <button onClick={()=>goTest(chId)} style={{...btn(true),flex:1}}>Opnieuw afleggen</button>
              <button onClick={()=>goChap(chId)} style={{...btn(false),flex:1}}>← {chapTitle}</button>
            </div>
          </div>
        </div>
      );
    }

    const q = ts.qs[ts.cur];
    return (
      <div style={root}>
        {styleTag}{particlesLayer}
        {masthead}
        <div style={{padding:'8px 16px',display:'flex',alignItems:'center',gap:10,borderBottom:`1px solid ${P.margin}`,background:P.paper,flexShrink:0}}>
          <button onClick={()=>goChap(chId)} style={btn(false,true)}>← {chapTitle}</button>
          <span style={{flex:1,textAlign:'right',fontSize:11,letterSpacing:2,textTransform:'uppercase',color:P.sepia,fontStyle:'italic'}}>Vraagstelling · {ts.cur+1}/5</span>
        </div>
        <div style={{height:2,background:P.paperDark,flexShrink:0,borderBottom:`1px solid ${P.margin}`}}>
          <div style={{height:'100%',background:P.sepia,width:`${(ts.res.length/5)*100}%`,transition:'width 0.3s'}}/>
        </div>
        <div style={body} className="paper-fade">
          {doubleHeader(`${ts.cur+1}/5`,'Quaestio')}

          {ts.fb==='w1' && (
            <div style={{padding:'10px 14px',background:P.errBg,border:`1px solid ${P.err}`,borderLeft:`3px double ${P.err}`,color:P.err,marginBottom:12,fontStyle:'italic',fontSize:13}}>
              ✗ Niet correct — probeer een tweede maal.
            </div>
          )}
          {ts.fb==='w2' && (
            <div style={{padding:'10px 14px',background:P.errBg,border:`1px solid ${P.err}`,borderLeft:`3px double ${P.err}`,marginBottom:12}}>
              <div style={{color:P.err,fontStyle:'italic',fontSize:13,marginBottom:4}}>✗ Helaas niet juist.</div>
              <div style={{fontSize:13}}>Het juiste antwoord: <b dangerouslySetInnerHTML={{__html:q.o[q.c]}}/></div>
              <div style={{fontSize:12,color:P.faded,marginTop:6,fontStyle:'italic'}} dangerouslySetInnerHTML={{__html:q.e}}/>
            </div>
          )}
          {ts.fb==='ok' && (
            <div style={{padding:'10px 14px',background:P.okBg,border:`1px solid ${P.ok}`,borderLeft:`3px double ${P.ok}`,color:P.ok,marginBottom:12,fontStyle:'italic',fontSize:13}}>
              ✓ Optime — correct!
            </div>
          )}

          <div style={{
            padding:'14px 16px',
            border:`1px solid ${P.margin}`,
            borderTop:`3px double ${P.rule}`,
            borderBottom:`3px double ${P.rule}`,
            background:P.paperLight,
            marginBottom:14,
          }}>
            <div style={{fontSize:14.5,lineHeight:1.7,color:P.ink}} dangerouslySetInnerHTML={{__html:q.q}}/>
          </div>

          {q.o.map((opt,i)=>{
            const isSel = ts.sel===i;
            const isCorr = (ts.fb==='ok'||ts.fb==='w2') && i===q.c;
            const isWrong = ts.fb==='w2' && isSel && i!==q.c;
            let bg=P.paperLight, bdr=P.margin, c=P.ink;
            if (isCorr) { bg=P.okBg; bdr=P.ok; c=P.ok; }
            else if (isWrong) { bg=P.errBg; bdr=P.err; c=P.err; }
            else if (isSel) { bg=P.paperDark; bdr=P.ink; c=P.ink; }
            return (
              <div key={i} onClick={()=>testSel(i)} style={{
                padding:'10px 14px',marginBottom:8,
                border:`1px solid ${bdr}`,
                borderLeft:`3px ${isCorr||isWrong||isSel?'double':'solid'} ${bdr}`,
                background:bg,color:c,
                cursor:(ts.fb==='ok'||ts.fb==='w2')?'default':'pointer',
                display:'flex',alignItems:'baseline',gap:12,fontSize:13.5,lineHeight:1.55,
              }}>
                <span style={{fontFamily:FONT_M,fontWeight:700,minWidth:18,color:c}}>
                  {['a)','b)','c)','d)'][i]}
                </span>
                <span dangerouslySetInnerHTML={{__html:opt}}/>
              </div>
            );
          })}

          {(ts.fb===null||ts.fb==='w1') && (
            <button onClick={testCheck} disabled={ts.sel===null} style={{
              ...btn(ts.sel!==null),width:'100%',marginTop:8,
              opacity:ts.sel===null?0.4:1,
              cursor:ts.sel===null?'default':'pointer',
            }}>Controleren</button>
          )}
          {(ts.fb==='ok'||ts.fb==='w2') && (
            <button onClick={testNext} style={{...btn(true),width:'100%',marginTop:8}}>
              {ts.cur===4?'Naar de beoordeling →':'Volgende quaestio →'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── COMPARE ──────────────────────────────────────────────
  if (screen==='compare') return (
    <div style={root}>
      {styleTag}{particlesLayer}
      {masthead}
      <div style={{padding:'8px 16px',display:'flex',alignItems:'center',gap:10,borderBottom:`1px solid ${P.margin}`,background:P.paper,flexShrink:0}}>
        <button onClick={()=>goChap('H4')} style={btn(false,true)}>← Redoxevenwichten</button>
        <span style={{flex:1,textAlign:'right',fontSize:11,letterSpacing:2,textTransform:'uppercase',color:P.sepia,fontStyle:'italic'}}>Appendix · Vergelijking</span>
      </div>
      <div style={body} className="paper-fade">
        {doubleHeader('App.','Galvanisch vs Elektrolytisch')}

        <p style={{
          fontSize:13.5,lineHeight:1.75,textAlign:'justify',
          textIndent:'1.4em',marginBottom:14,color:P.ink,
        }}>
          De twee typen elektrochemische cellen onderscheiden zich vooral door de richting van de energieomzetting en, daaruit volgend, door de omkering van de pooltekens. De onderstaande tabel zet de eigenschappen synoptisch naast elkaar.
        </p>

        <div style={{overflowX:'auto',border:`1px solid ${P.margin}`,background:P.paperLight}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:13,fontFamily:FONT_S}}>
            <thead>
              <tr>
                <th style={{padding:'9px 12px',textAlign:'left',borderBottom:`3px double ${P.rule}`,background:P.paperDark,color:P.faded,fontStyle:'italic',fontSize:11,letterSpacing:1,fontWeight:700,textTransform:'uppercase'}}>Eigenschap</th>
                <th style={{padding:'9px 12px',textAlign:'left',borderBottom:`3px double ${P.rule}`,background:P.paperDark,color:P.ink,fontSize:12,fontWeight:700,fontStyle:'italic'}}>Galvanische cel</th>
                <th style={{padding:'9px 12px',textAlign:'left',borderBottom:`3px double ${P.rule}`,background:P.paperDark,color:P.sepia,fontSize:12,fontWeight:700,fontStyle:'italic'}}>Elektrolytische cel</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row,i)=>(
                <tr key={i}>
                  <td style={{padding:'9px 12px',fontWeight:600,borderBottom:`1px dotted ${P.margin}`,color:P.faded,fontSize:12,fontStyle:'italic'}}>{row.r}</td>
                  <td style={{padding:'9px 12px',borderBottom:`1px dotted ${P.margin}`,color:P.ink}} dangerouslySetInnerHTML={{__html:row.g}}/>
                  <td style={{padding:'9px 12px',borderBottom:`1px dotted ${P.margin}`,color:P.sepia}} dangerouslySetInnerHTML={{__html:row.e}}/>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {subHeader('Memorandum')}
        <div style={{
          border:`1px solid ${P.margin}`,
          borderLeft:`3px double ${P.sepia}`,
          background:P.paperLight,
          padding:'12px 14px',
          fontSize:13.5,lineHeight:1.75,
        }}>
          <p style={{margin:'0 0 6px'}}><i style={{color:P.sepia}}>Galvanisch:</i> de cel IS de stroombron. De anode is negatief (−), omdat oxidatie elektronen wegduwt naar de externe kring.</p>
          <p style={{margin:0}}><i style={{color:P.sepia}}>Elektrolyse:</i> de cel VERBRUIKT stroom. De externe spanningsbron keert de pooltekens om — anode wordt positief (+).</p>
        </div>

        <div style={{textAlign:'center',marginTop:20,fontStyle:'italic',color:P.faded,fontSize:11,letterSpacing:2}}>
          ❦ &nbsp; einde van de appendix &nbsp; ❦
        </div>
      </div>
    </div>
  );

  return null;
}
