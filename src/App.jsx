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
{s:1,q:'Schrijf de ionisatievergelijking van HCl in water.',
a:'HCl → H<sup>+</sup> + Cl<sup>−</sup><br>HCl is een sterk zuur: volledig ionisatie (→). H<sup>+</sup> bindt direct aan water: H<sup>+</sup> + H<sub>2</sub>O → H<sub>3</sub>O<sup>+</sup>.'},
{s:1,q:'Schrijf de dissociatie van NaOH in water.',
a:'NaOH → Na<sup>+</sup> + OH<sup>−</sup><br>NaOH is een sterke base (ionische verbinding) die volledig dissocieert. OH<sup>−</sup> geeft de oplossing haar basisch karakter.'},
{s:1,q:'Is CH<sub>3</sub>COOH een sterk of zwak zuur? Verklaar met pijltype.',
a:'<b>Zwak zuur</b> — evenwichtspijl (⇌): CH<sub>3</sub>COOH ⇌ H<sup>+</sup> + CH<sub>3</sub>COO<sup>−</sup><br>Slechts een klein deel ioniseert. K<sub>z</sub> = 1,74×10<sup>−5</sup> << 1.'},
{s:1,q:'Noem twee beperkingen van de definitie van Arrhenius.',
a:'1) Geldt enkel in waterig milieu — geen uitspraken in andere oplosmiddelen.<br>2) NH<sub>3</sub> is duidelijk een base maar bevat geen OH<sup>−</sup> → past niet in het Arrhenius-schema.'},
{s:2,q:'H<sub>2</sub>SO<sub>4</sub> is tweewaardig. Schrijf beide ionisatiestappen en verklaar het verschil.',
a:'Stap 1: H<sub>2</sub>SO<sub>4</sub> → H<sup>+</sup> + HSO<sub>4</sub><sup>−</sup> (volledig: sterke ionisatie)<br>Stap 2: HSO<sub>4</sub><sup>−</sup> ⇌ H<sup>+</sup> + SO<sub>4</sub><sup>2−</sup> (gedeeltelijk: zwakker)<br>Elke stap vertrekt van een negatiever deeltje dat H<sup>+</sup> sterker vasthoudt → K<sub>z2</sub> << K<sub>z1</sub>.'},
{s:2,q:'Verklaar waarom NH<sub>3</sub> niet past in de definitie van Arrhenius, maar toch als base werkt.',
a:'Arrhenius vereist OH<sup>−</sup>-afgifte, maar NH<sub>3</sub> heeft geen OH-groep.<br>Reactie: NH<sub>3</sub> + H<sub>2</sub>O ⇌ NH<sub>4</sub><sup>+</sup> + OH<sup>−</sup><br>NH<sub>3</sub> neemt indirect een proton op van water → OH<sup>−</sup> gevormd. Beter beschreven door Brønsted-Lowry.'},
{s:3,q:'H<sub>3</sub>PO<sub>4</sub> is driewaardig. Schrijf de drie ionisatiestappen en verklaar de trend in K<sub>z</sub>.',
a:'1) H<sub>3</sub>PO<sub>4</sub> ⇌ H<sup>+</sup> + H<sub>2</sub>PO<sub>4</sub><sup>−</sup> (K<sub>z1</sub> = 7,5×10<sup>−3</sup>)<br>2) H<sub>2</sub>PO<sub>4</sub><sup>−</sup> ⇌ H<sup>+</sup> + HPO<sub>4</sub><sup>2−</sup> (K<sub>z2</sub> = 6,2×10<sup>−8</sup>)<br>3) HPO<sub>4</sub><sup>2−</sup> ⇌ H<sup>+</sup> + PO<sub>4</sub><sup>3−</sup> (K<sub>z3</sub> = 4,8×10<sup>−13</sup>)<br>K<sub>z1</sub> >> K<sub>z2</sub> >> K<sub>z3</sub>: bij elke stap is de negatieve lading groter → H<sup>+</sup> wordt sterker aangetrokken → moeilijker af te staan.'},
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
{s:1,q:'Geef de geconjugeerde base van CH<sub>3</sub>COOH.',
a:'CH<sub>3</sub>COO<sup>−</sup><br>Geconjugeerde base = zuur − 1 proton: CH<sub>3</sub>COOH − H<sup>+</sup> = CH<sub>3</sub>COO<sup>−</sup>.'},
{s:1,q:'Geef het geconjugeerde zuur van NH<sub>3</sub>.',
a:'NH<sub>4</sub><sup>+</sup><br>Geconjugeerd zuur = base + 1 proton: NH<sub>3</sub> + H<sup>+</sup> = NH<sub>4</sub><sup>+</sup>.'},
{s:1,q:'Welk deeltje is amfoter: H<sub>2</sub>O, OH<sup>−</sup> of HCO<sub>3</sub><sup>−</sup>? Verklaar.',
a:'<b>HCO<sub>3</sub><sup>−</sup></b> is amfoter (en ook H<sub>2</sub>O):<br>Als zuur: HCO<sub>3</sub><sup>−</sup> ⇌ H<sup>+</sup> + CO<sub>3</sub><sup>2−</sup><br>Als base: HCO<sub>3</sub><sup>−</sup> + H<sup>+</sup> ⇌ H<sub>2</sub>CO<sub>3</sub><br>OH<sup>−</sup> kan enkel proton opnemen (base), nooit afstaan in normale omstandigheden.'},
{s:1,q:'Identificeer de twee zuur-base paren in: HCl + H<sub>2</sub>O → H<sub>3</sub>O<sup>+</sup> + Cl<sup>−</sup>',
a:'Paar 1: HCl (zuur) ↔ Cl<sup>−</sup> (geconj. base)<br>Paar 2: H<sub>2</sub>O (base) ↔ H<sub>3</sub>O<sup>+</sup> (geconj. zuur)<br>HCl geeft H<sup>+</sup> aan H<sub>2</sub>O. Evenwicht volledig rechts: HCl is sterk zuur.'},
{s:2,q:'Schrijf de reactie van NH<sub>3</sub> + H<sub>2</sub>O en duid alle geconjugeerde paren aan.',
a:'NH<sub>3</sub> + H<sub>2</sub>O ⇌ NH<sub>4</sub><sup>+</sup> + OH<sup>−</sup><br>Paar 1: H<sub>2</sub>O (zuur) ↔ OH<sup>−</sup> (geconj. base)<br>Paar 2: NH<sub>4</sub><sup>+</sup> (geconj. zuur) ↔ NH<sub>3</sub> (base)<br>Evenwicht ligt links (NH<sub>3</sub> is zwakke base, K<sub>b</sub> = 1,8×10<sup>−5</sup>).'},
{s:2,q:'Verklaar waarom H<sub>2</sub>O amfoter is. Geef twee voorbeeldreacties.',
a:'Als <b>base</b>: HCl + H<sub>2</sub>O → H<sub>3</sub>O<sup>+</sup> + Cl<sup>−</sup> (H<sub>2</sub>O neemt H<sup>+</sup> op)<br>Als <b>zuur</b>: NH<sub>3</sub> + H<sub>2</sub>O ⇌ NH<sub>4</sub><sup>+</sup> + OH<sup>−</sup> (H<sub>2</sub>O geeft H<sup>+</sup> af)<br>Dit is het amfotere karakter: gedraagt zich als zuur of base naargelang de reactiepartner.'},
{s:3,q:'HCO<sub>3</sub><sup>−</sup> reageert met NaOH én met HCl. Schrijf beide reacties en verklaar het amfoter karakter.',
a:'Als <b>zuur</b> (met NaOH): HCO<sub>3</sub><sup>−</sup> + OH<sup>−</sup> → CO<sub>3</sub><sup>2−</sup> + H<sub>2</sub>O<br>Als <b>base</b> (met HCl): HCO<sub>3</sub><sup>−</sup> + H<sup>+</sup> → H<sub>2</sub>CO<sub>3</sub> → H<sub>2</sub>O + CO<sub>2</sub>↑<br>HCO<sub>3</sub><sup>−</sup> bevindt zich qua sterkte tussen H<sub>2</sub>CO<sub>3</sub> en CO<sub>3</sub><sup>2−</sup> in de reeks → amfoter. Basis van het bloedbuffersysteem.'},
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
{s:1,q:'Rangschik van sterk naar zwak: HCl, CH<sub>3</sub>COOH (K<sub>z</sub>=1,74×10<sup>−5</sup>), HCOOH (K<sub>z</sub>=1,77×10<sup>−4</sup>).',
a:'HCl > HCOOH > CH<sub>3</sub>COOH<br>HCl: sterk (volledige ionisatie).<br>HCOOH: K<sub>z</sub>=1,77×10<sup>−4</sup> groter → sterker dan CH<sub>3</sub>COOH.<br>CH<sub>3</sub>COOH: K<sub>z</sub>=1,74×10<sup>−5</sup> kleinst → zwakste.'},
{s:1,q:'Bereken pK<sub>z</sub> van CH<sub>3</sub>COOH (K<sub>z</sub> = 1,74×10<sup>−5</sup>).',
a:'pK<sub>z</sub> = −log(1,74×10<sup>−5</sup>) = −(log 1,74 + log 10<sup>−5</sup>) = −(0,24 − 5) = <b>4,76</b>'},
{s:1,q:'Bereken K<sub>b</sub> van CH<sub>3</sub>COO<sup>−</sup> (K<sub>z</sub>(CH<sub>3</sub>COOH) = 1,74×10<sup>−5</sup>).',
a:'K<sub>b</sub> = K<sub>w</sub> / K<sub>z</sub> = 10<sup>−14</sup> / 1,74×10<sup>−5</sup> = <b>5,75×10<sup>−10</sup></b><br>CH<sub>3</sub>COO<sup>−</sup> is de geconjugeerde base van CH<sub>3</sub>COOH → K<sub>z</sub>·K<sub>b</sub> = K<sub>w</sub>.'},
{s:1,q:'Welk zuur is zwakker: pK<sub>z</sub> = 4,76 of pK<sub>z</sub> = 7,54?',
a:'pK<sub>z</sub> = 7,54 is <b>zwakker</b>.<br>Grotere pK<sub>z</sub> = kleinere K<sub>z</sub> = minder ionisatie = zwakker zuur.<br>pK<sub>z</sub> 7,54 hoort bij HClO (K<sub>z</sub>=2,88×10<sup>−8</sup>).'},
{s:2,q:'Bereken K<sub>z</sub> van HClO als pK<sub>z</sub> = 7,54.',
a:'K<sub>z</sub> = 10<sup>−pKz</sup> = 10<sup>−7,54</sup><br>= 10<sup>0,46</sup> × 10<sup>−8</sup> = 2,88 × 10<sup>−8</sup><br>Controle: log(2,88×10<sup>−8</sup>) = log 2,88 − 8 ≈ 0,46 − 8 = −7,54 ✓'},
{s:2,q:'Is CH<sub>3</sub>COO<sup>−</sup> een zwakke of sterke base? Bereken K<sub>b</sub> en verklaar.',
a:'<b>Zwakke base</b>: K<sub>b</sub> = 10<sup>−14</sup>/1,74×10<sup>−5</sup> = 5,75×10<sup>−10</sup> << 1<br>Reactie: CH<sub>3</sub>COO<sup>−</sup> + H<sub>2</sub>O ⇌ CH<sub>3</sub>COOH + OH<sup>−</sup><br>Sterk zuur (HCl) → heel zwakke geconjugeerde base; zwak zuur (CH<sub>3</sub>COOH) → iets sterkere geconjugeerde base, maar nog steeds zwak.'},
{s:3,q:'In een evenwichtsmengsel van 0,10 mol/L CH<sub>3</sub>COOH is [H<sub>3</sub>O<sup>+</sup>] = 1,32×10<sup>−3</sup> mol/L. Bereken K<sub>z</sub> en vergelijk met tabelwaarde.',
a:'ICE-tabel: [CH<sub>3</sub>COOH]<sub>eq</sub> = 0,10 − 0,00132 ≈ 0,0987 M<br>[H<sub>3</sub>O<sup>+</sup>] = [CH<sub>3</sub>COO<sup>−</sup>] = 1,32×10<sup>−3</sup> M<br>K<sub>z</sub> = (1,32×10<sup>−3</sup>)² / 0,0987 = 1,74×10<sup>−6</sup> / 0,0987 = <b>1,76×10<sup>−5</sup></b><br>Tabelwaarde: 1,74×10<sup>−5</sup> ✓ (klein verschil door afronden)'},
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
{s:1,q:'Bereken [OH<sup>−</sup>] als pH = 3.',
a:'pH = 3 → [H<sub>3</sub>O<sup>+</sup>] = 10<sup>−3</sup> mol/L<br>pOH = 14 − 3 = 11 → [OH<sup>−</sup>] = 10<sup>−11</sup> mol/L<br>Check: 10<sup>−3</sup> × 10<sup>−11</sup> = 10<sup>−14</sup> = K<sub>w</sub> ✓'},
{s:1,q:'Bereken pH als [H<sub>3</sub>O<sup>+</sup>] = 10<sup>−9</sup> mol/L.',
a:'pH = −log(10<sup>−9</sup>) = <b>9</b><br>pH > 7 → <b>basische</b> oplossing.'},
{s:1,q:'Is een oplossing met pH = 9 zuur of basisch? Verklaar via [H<sub>3</sub>O<sup>+</sup>].',
a:'<b>Basisch</b>: pH = 9 > 7.<br>[H<sub>3</sub>O<sup>+</sup>] = 10<sup>−9</sup> < 10<sup>−7</sup> mol/L (minder dan puur water).<br>[OH<sup>−</sup>] = 10<sup>−5</sup> > 10<sup>−7</sup> mol/L → overschot aan OH<sup>−</sup>.'},
{s:1,q:'Bereken pOH als pH = 5.',
a:'pOH = 14 − pH = 14 − 5 = <b>9</b><br>[OH<sup>−</sup>] = 10<sup>−9</sup> mol/L → zure oplossing (OH<sup>−</sup> tekort t.o.v. H<sub>3</sub>O<sup>+</sup>).'},
{s:2,q:'Bereken [H<sub>3</sub>O<sup>+</sup>] en [OH<sup>−</sup>] als pOH = 4.',
a:'pOH = 4 → [OH<sup>−</sup>] = 10<sup>−4</sup> mol/L<br>pH = 14 − 4 = 10 → [H<sub>3</sub>O<sup>+</sup>] = 10<sup>−10</sup> mol/L<br>Check: 10<sup>−10</sup> × 10<sup>−4</sup> = 10<sup>−14</sup> ✓'},
{s:2,q:'Een oplossing heeft [OH<sup>−</sup>] = 2,5×10<sup>−3</sup> mol/L. Bereken pH.',
a:'pOH = −log(2,5×10<sup>−3</sup>) = 3 − log(2,5) = 3 − 0,40 = 2,60<br>pH = 14 − 2,60 = <b>11,40</b><br>Basische oplossing (pH > 7) ✓'},
{s:3,q:'Bereken de pH waarbij [H<sub>3</sub>O<sup>+</sup>] = 100 × [OH<sup>−</sup>]. Verklaar via K<sub>w</sub>.',
a:'Stel [H<sub>3</sub>O<sup>+</sup>] = 100·[OH<sup>−</sup>]<br>K<sub>w</sub> = 100·[OH<sup>−</sup>]·[OH<sup>−</sup>] = 10<sup>−14</sup><br>[OH<sup>−</sup>]² = 10<sup>−16</sup> → [OH<sup>−</sup>] = 10<sup>−8</sup> → pOH = 8<br>pH = 14 − 8 = <b>6</b><br>Licht zuur: [H<sub>3</sub>O<sup>+</sup>] = 10<sup>−6</sup>, [OH<sup>−</sup>] = 10<sup>−8</sup> — verhouding 100:1 ✓'},
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
{s:1,q:'Bereken pH van 0,01 mol/L HCl.',
a:'HCl = sterk zuur: [H<sub>3</sub>O<sup>+</sup>] = 0,01 = 10<sup>−2</sup> mol/L<br>pH = −log(10<sup>−2</sup>) = <b>2</b>'},
{s:1,q:'Bereken pH van 0,10 mol/L NaOH.',
a:'NaOH = sterke base: [OH<sup>−</sup>] = 0,10 mol/L<br>pOH = −log(0,10) = 1<br>pH = 14 − 1 = <b>13</b>'},
{s:1,q:'Bereken pH van 0,10 mol/L CH<sub>3</sub>COOH (K<sub>z</sub> = 1,74×10<sup>−5</sup>).',
a:'[H<sub>3</sub>O<sup>+</sup>] = √(1,74×10<sup>−5</sup> × 0,10) = √(1,74×10<sup>−6</sup>) = 1,32×10<sup>−3</sup> mol/L<br>pH = −log(1,32×10<sup>−3</sup>) = <b>2,88</b><br>α = 1,32×10<sup>−3</sup>/0,10 × 100% = 1,32% < 5% ✓'},
{s:1,q:'Bereken pH van 0,050 mol/L HCOOH (K<sub>z</sub> = 1,77×10<sup>−4</sup>).',
a:'[H<sub>3</sub>O<sup>+</sup>] = √(1,77×10<sup>−4</sup> × 0,050) = √(8,85×10<sup>−6</sup>) = 2,98×10<sup>−3</sup> mol/L<br>pH = −log(2,98×10<sup>−3</sup>) = <b>2,53</b><br>α = 2,98×10<sup>−3</sup>/0,050 × 100% = 5,96% ≈ grenswaarde; aanvaardbaar.'},
{s:2,q:'Bereken pH van 0,001 mol/L CH<sub>3</sub>COOH (K<sub>z</sub> = 1,74×10<sup>−5</sup>). Controleer α.',
a:'[H<sub>3</sub>O<sup>+</sup>] = √(1,74×10<sup>−5</sup> × 10<sup>−3</sup>) = √(1,74×10<sup>−8</sup>) = 1,32×10<sup>−4</sup> mol/L<br>pH = −log(1,32×10<sup>−4</sup>) = <b>3,88</b><br>α = 1,32×10<sup>−4</sup>/10<sup>−3</sup> × 100% = <b>13,2% &gt; 5% ✗</b><br>→ benadering niet geldig bij lage concentratie!'},
{s:2,q:'Los 2,00 g NaOH (M = 40 g/mol) op in 500 mL water. Bereken pH.',
a:'n(NaOH) = 2,00/40 = 0,050 mol<br>c(NaOH) = 0,050/0,500 = 0,10 mol/L<br>[OH<sup>−</sup>] = 0,10 → pOH = 1,00 → pH = <b>13,00</b>'},
{s:3,q:'Bereken pH van een mengsel: 100 mL 0,10 mol/L HCl + 100 mL 0,10 mol/L CH<sub>3</sub>COOH.',
a:'n(HCl) = 0,010 mol; n(CH<sub>3</sub>COOH) = 0,010 mol; V<sub>totaal</sub> = 200 mL<br>c(HCl) = 0,050 mol/L; c(CH<sub>3</sub>COOH) = 0,050 mol/L<br>HCl is sterk zuur → domineert; [H<sub>3</sub>O<sup>+</sup>] ≈ 0,050 mol/L<br>(bijdrage CH<sub>3</sub>COOH wordt onderdrukt door hoge [H<sub>3</sub>O<sup>+</sup>])<br>pH = −log(0,050) = <b>1,30</b>'},
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
{s:1,q:'25,0 mL HCl getitreerd met 0,10 mol/L NaOH, verbruik 18,5 mL. Bereken c(HCl).',
a:'1·c<sub>z</sub>·25,0 = 1·0,10·18,5<br>c(HCl) = (0,10 × 18,5)/25,0 = <b>0,074 mol/L</b>'},
{s:1,q:'Welk volume 0,20 mol/L NaOH nodig om 30,0 mL 0,15 mol/L HCl te neutraliseren?',
a:'1·0,15·30,0 = 1·0,20·V<sub>b</sub><br>V<sub>b</sub> = (0,15 × 30,0)/0,20 = <b>22,5 mL</b>'},
{s:1,q:'Welke indicator gebruik je voor een titratie sterk zuur + sterke base? Verklaar.',
a:'Beide (fenolftaleïne of methyloranje) zijn geschikt.<br>Equivalentiepunt bij pH = 7 (neutraal zout). De pH-sprong is steil (bijv. pH 3→11 bij equiv.), zodat beide indicatoren tijdig omslagen.'},
{s:1,q:'20,0 mL H<sub>2</sub>SO<sub>4</sub> + 40,0 mL 0,10 mol/L NaOH. Bereken c(H<sub>2</sub>SO<sub>4</sub>). [n<sub>z</sub> = 2]',
a:'2·c<sub>z</sub>·20,0 = 1·0,10·40,0<br>c(H<sub>2</sub>SO<sub>4</sub>) = (0,10 × 40,0)/(2 × 20,0) = <b>0,10 mol/L</b>'},
{s:2,q:'250 mL oplossing bevat 1,825 g HCl (M = 36,5 g/mol). Welk volume 0,10 mol/L NaOH nodig?',
a:'n(HCl) = 1,825/36,5 = 0,050 mol<br>c(HCl) = 0,050/0,250 = 0,20 mol/L<br>1·0,20·250 = 1·0,10·V<sub>b</sub> → V<sub>b</sub> = <b>500 mL</b>'},
{s:2,q:'0,500 g azijnzuurstaal, getitreerd met 0,100 mol/L NaOH, verbruik 41,7 mL. Zuiverheidsgehalte?',
a:'n(NaOH) = 0,100 × 0,0417 = 4,17×10<sup>−3</sup> mol<br>n(CH<sub>3</sub>COOH) = 4,17×10<sup>−3</sup> mol (n = 1)<br>m(CH<sub>3</sub>COOH) = 4,17×10<sup>−3</sup> × 60,0 = 0,250 g<br>Zuiverheid = 0,250/0,500 × 100% = <b>50,0%</b>'},
{s:3,q:'Mengsel NaOH + Na<sub>2</sub>CO<sub>3</sub> getitreerd met 0,100 mol/L HCl (V<sub>staal</sub> = 25,0 mL).<br>Fenolftaleïne: V<sub>1</sub> = 22,5 mL; methyloranje (totaal): V<sub>tot</sub> = 35,0 mL. Bereken c(NaOH) en c(Na<sub>2</sub>CO<sub>3</sub>).',
a:'V<sub>2</sub> (HCO<sub>3</sub><sup>−</sup>→H<sub>2</sub>CO<sub>3</sub>) = 35,0 − 22,5 = 12,5 mL → voor CO<sub>3</sub><sup>2−</sup> tweede stap<br>n(CO<sub>3</sub><sup>2−</sup>) = 0,100 × 0,0125 = 1,25×10<sup>−3</sup> mol<br>c(Na<sub>2</sub>CO<sub>3</sub>) = 1,25×10<sup>−3</sup>/0,0250 = <b>0,050 mol/L</b><br>V(NaOH) = V<sub>1</sub> − V<sub>2</sub> = 22,5 − 12,5 = 10,0 mL<br>c(NaOH) = (0,100 × 0,0100)/0,0250 = <b>0,040 mol/L</b>'},
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
{s:1,q:'Bereken pH van buffer: 0,10 mol/L CH<sub>3</sub>COOH + 0,10 mol/L CH<sub>3</sub>COO<sup>−</sup> (pK<sub>z</sub> = 4,76).',
a:'pH = 4,76 + log(0,10/0,10) = 4,76 + log(1) = 4,76 + 0 = <b>4,76</b><br>Bij gelijke concentraties: pH = pK<sub>z</sub>.'},
{s:1,q:'Bereken pH van buffer: 0,050 mol/L CH<sub>3</sub>COOH + 0,100 mol/L CH<sub>3</sub>COO<sup>−</sup> (pK<sub>z</sub> = 4,76).',
a:'pH = 4,76 + log(0,100/0,050) = 4,76 + log(2) = 4,76 + 0,30 = <b>5,06</b>'},
{s:1,q:'Welke combinatie vormt een buffer?<br>a) HCl + NaCl &nbsp; b) CH<sub>3</sub>COOH + CH<sub>3</sub>COONa &nbsp; c) NaOH + NaCl',
a:'<b>b) CH<sub>3</sub>COOH + CH<sub>3</sub>COONa</b> — zwak zuur + zout van zijn geconjugeerde base.<br>a) HCl = sterk zuur → volledig ionisatie → geen evenwicht → geen buffer.<br>c) NaOH = sterke base + neutraal zout → geen buffer.'},
{s:1,q:'Bereken pH van het bloedbuffer: [HCO<sub>3</sub><sup>−</sup>]/[CO<sub>2</sub>] = 20, pK<sub>z</sub>(CO<sub>2</sub>) = 6,35.',
a:'pH = 6,35 + log(20) = 6,35 + 1,30 = <b>7,65</b><br>Normaal bloed: pH ≈ 7,40 bij ratio ≈ 20. Deze waarde wijst op lichte alkalose (pH > 7,45).'},
{s:2,q:'Bereken [CH<sub>3</sub>COO<sup>−</sup>]/[CH<sub>3</sub>COOH] in een buffer bij pH = 5,0 (pK<sub>z</sub> = 4,76).',
a:'5,0 = 4,76 + log(r) → log(r) = 0,24<br>r = 10<sup>0,24</sup> = <b>1,74</b><br>Er is 1,74 maal meer base dan zuur nodig voor pH = 5,0.'},
{s:2,q:'Voeg 1,0 mmol NaOH toe aan 100 mL buffer (0,10 mol/L CH<sub>3</sub>COOH + 0,10 mol/L CH<sub>3</sub>COO<sup>−</sup>). Nieuwe pH?',
a:'n<sub>0</sub>(zuur) = n<sub>0</sub>(base) = 10,0 mmol<br>NaOH neutraliseert zuur: n(zuur) = 9,0 mmol; n(base) = 11,0 mmol<br>pH = 4,76 + log(11,0/9,0) = 4,76 + 0,087 = <b>4,85</b><br>ΔpH = 0,09 — bijna geen verandering! Buffer werkt. ✓'},
{s:3,q:'Ontwerp fosfaatbuffer bij pH = 7,54 met NaH<sub>2</sub>PO<sub>4</sub>/Na<sub>2</sub>HPO<sub>4</sub> (pK<sub>z</sub> = 7,20). Welke verhouding [HPO<sub>4</sub><sup>2−</sup>]/[H<sub>2</sub>PO<sub>4</sub><sup>−</sup>]?',
a:'7,54 = 7,20 + log(r) → log(r) = 0,34<br>r = 10<sup>0,34</sup> = <b>2,19</b><br>Neem bv. 0,219 mol Na<sub>2</sub>HPO<sub>4</sub> + 0,100 mol NaH<sub>2</sub>PO<sub>4</sub> per liter.<br>Dit buffersysteem is een van de meerdere fysiologische buffers naast HCO<sub>3</sub><sup>−</sup>/CO<sub>2</sub>.'},
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
{s:1,q:'Bepaal het oxidatiegetal van S in H<sub>2</sub>SO<sub>4</sub>.',
a:'ΣOG = 0: 2(+1) + OG(S) + 4(−2) = 0<br>2 + OG(S) − 8 = 0 → OG(S) = <b>+6</b>'},
{s:1,q:'Bepaal het OG van N in NO<sub>3</sub><sup>−</sup>.',
a:'ΣOG = −1: OG(N) + 3(−2) = −1<br>OG(N) = −1 + 6 = <b>+5</b>'},
{s:1,q:'Bepaal het OG van Mn in KMnO<sub>4</sub>.',
a:'ΣOG = 0: (+1) + OG(Mn) + 4(−2) = 0<br>OG(Mn) = 8 − 1 = <b>+7</b>'},
{s:1,q:'Welk atoom wordt geoxideerd in Mg + CuSO<sub>4</sub> → MgSO<sub>4</sub> + Cu?',
a:'Mg: OG 0 → +2 (stijgt = <b>oxidatie</b>)<br>Cu: OG +2 → 0 (daalt = reductie)<br>Mg wordt geoxideerd; Cu<sup>2+</sup> wordt gereduceerd.'},
{s:2,q:'Bepaal OG van Cr in K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>.',
a:'ΣOG = 0: 2(+1) + 2·OG(Cr) + 7(−2) = 0<br>2 + 2·OG(Cr) − 14 = 0 → OG(Cr) = <b>+6</b>'},
{s:2,q:'Bepaal OG van S in Na<sub>2</sub>S<sub>2</sub>O<sub>3</sub> (thiosulfaat).',
a:'ΣOG = 0: 2(+1) + 2·OG(S) + 3(−2) = 0<br>2·OG(S) = 4 → OG(S) = <b>+2</b> (gemiddeld)<br>In werkelijkheid zijn de twee S-atomen niet gelijkwaardig; maar gemiddeld OG = +2.'},
{s:3,q:'In 2KMnO<sub>4</sub> + 5H<sub>2</sub>O<sub>2</sub> + 3H<sub>2</sub>SO<sub>4</sub> → 2MnSO<sub>4</sub> + 5O<sub>2</sub> + K<sub>2</sub>SO<sub>4</sub> + 8H<sub>2</sub>O: bepaal wat oxideert en wat reduceert.',
a:'Mn in KMnO<sub>4</sub>: +7 → +2 → <b>reductie</b> (OG daalt)<br>O in H<sub>2</sub>O<sub>2</sub>: −1 → 0 in O<sub>2</sub> → <b>oxidatie</b> (OG stijgt)<br>KMnO<sub>4</sub> = oxidatiemiddel (oxidans) — wordt zelf gereduceerd.<br>H<sub>2</sub>O<sub>2</sub> = reductiemiddel (reducens) — wordt zelf geoxideerd.'},
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
{s:1,q:'Is Zn + Cu<sup>2+</sup> → Zn<sup>2+</sup> + Cu spontaan? (E<sup>0</sup>(Zn)=−0,76V, E<sup>0</sup>(Cu)=+0,34V)',
a:'U<sub>b</sub> = 0,34 − (−0,76) = <b>+1,10 V > 0 → spontaan</b><br>Zn is sterkere reductor dan Cu; Cu<sup>2+</sup> wordt spontaan gereduceerd.'},
{s:1,q:'Welk metaal is de sterkste reductor: Mg, Zn of Fe?',
a:'<b>Mg</b> (E<sup>0</sup> = −2,36 V) — laagste E<sup>0</sup> in de reeks.<br>Zn: −0,76 V; Fe: −0,44 V. Negatiever E<sup>0</sup> = sterker reductor.'},
{s:1,q:'Zal Ag oplossen in CuSO<sub>4</sub>-oplossing? Verklaar.',
a:'E<sup>0</sup>(Ag) = +0,80 V; E<sup>0</sup>(Cu) = +0,34 V<br>Ag staat <b>onder</b> Cu in de reeks → Ag is zwakkere reductor dan Cu.<br>Reactie Ag + Cu<sup>2+</sup> → <b>niet spontaan</b>. Ag lost niet op.'},
{s:1,q:'Rangschik naar oxiderende kracht (sterkst eerst): Ag<sup>+</sup>, Cu<sup>2+</sup>, Zn<sup>2+</sup>.',
a:'<b>Ag<sup>+</sup> > Cu<sup>2+</sup> > Zn<sup>2+</sup></b><br>Sterker oxidans = hoger E<sup>0</sup>: Ag<sup>+</sup>(+0,80V) > Cu<sup>2+</sup>(+0,34V) > Zn<sup>2+</sup>(−0,76V)'},
{s:2,q:'Bereken U<sub>b</sub> voor de reactie Zn + 2Ag<sup>+</sup> → Zn<sup>2+</sup> + 2Ag.',
a:'Anode: Zn → Zn<sup>2+</sup> + 2e<sup>−</sup> (E<sup>0</sup>=−0,76V)<br>Kathode: 2Ag<sup>+</sup> + 2e<sup>−</sup> → 2Ag (E<sup>0</sup>=+0,80V)<br>U<sub>b</sub> = 0,80 − (−0,76) = <b>+1,56 V</b>'},
{s:2,q:'Zal Fe reageren met Pb(NO<sub>3</sub>)<sub>2</sub>? Bereken U<sub>b</sub> (E<sup>0</sup>(Fe)=−0,44V, E<sup>0</sup>(Pb)=−0,13V).',
a:'U<sub>b</sub> = −0,13 − (−0,44) = <b>+0,31 V > 0 → spontaan ✓</b><br>Fe + Pb<sup>2+</sup> → Fe<sup>2+</sup> + Pb'},
{s:3,q:'Mg gedompeld in AgNO<sub>3</sub>. Schrijf de spontane reactie en bereken U<sub>b</sub> (E<sup>0</sup>(Mg)=−2,36V, E<sup>0</sup>(Ag)=+0,80V).',
a:'Mg = sterkste reductor, Ag<sup>+</sup> = oxidans.<br>Halfreacties: Mg → Mg<sup>2+</sup> + 2e<sup>−</sup> en 2Ag<sup>+</sup> + 2e<sup>−</sup> → 2Ag<br>Totaal: Mg + 2Ag<sup>+</sup> → Mg<sup>2+</sup> + 2Ag<br>U<sub>b</sub> = 0,80 − (−2,36) = <b>+3,16 V</b> (zeer spontaan!)'},
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
{s:1,q:'Bereken U<sub>b</sub> voor Ni-Cu cel (E<sup>0</sup>(Ni)=−0,23V, E<sup>0</sup>(Cu)=+0,34V).',
a:'Ni: lagere E<sup>0</sup> → anode &nbsp;·&nbsp; Cu: hogere E<sup>0</sup> → kathode<br>U<sub>b</sub> = 0,34 − (−0,23) = <b>+0,57 V</b>'},
{s:1,q:'Bereken U<sub>b</sub> voor Zn-Ag cel (E<sup>0</sup>(Zn)=−0,76V, E<sup>0</sup>(Ag)=+0,80V).',
a:'Zn: anode &nbsp;·&nbsp; Ag: kathode<br>U<sub>b</sub> = 0,80 − (−0,76) = <b>+1,56 V</b>'},
{s:1,q:'Is Pb + Sn<sup>2+</sup> → Pb<sup>2+</sup> + Sn spontaan? (E<sup>0</sup>(Pb)=−0,13V, E<sup>0</sup>(Sn)=−0,14V)',
a:'Als Pb = anode (geoxideerd): U<sub>b</sub> = E<sup>0</sup>(Sn) − E<sup>0</sup>(Pb) = −0,14 − (−0,13) = <b>−0,01 V &lt; 0 → niet spontaan</b><br>Sn heeft lagere E<sup>0</sup> → Sn is de reductor, niet Pb.'},
{s:1,q:'Bereken U<sub>b</sub> voor Fe-Cu cel (E<sup>0</sup>(Fe)=−0,44V, E<sup>0</sup>(Cu)=+0,34V).',
a:'Fe: anode &nbsp;·&nbsp; Cu: kathode<br>U<sub>b</sub> = 0,34 − (−0,44) = <b>+0,78 V</b>'},
{s:2,q:'In een Pb-Sn cel: welk metaal is de anode? Bereken U<sub>b</sub>.',
a:'E<sup>0</sup>(Sn) = −0,14V < E<sup>0</sup>(Pb) = −0,13V → <b>Sn is anode</b><br>U<sub>b</sub> = −0,13 − (−0,14) = <b>+0,01 V</b> (nauwelijks spontaan)'},
{s:2,q:'In een galvanische cel is U<sub>b</sub> = +0,57V. Als E<sup>0</sup>(kathode) = +0,34V, wat is E<sup>0</sup>(anode)?',
a:'U<sub>b</sub> = E<sup>0</sup>(kathode) − E<sup>0</sup>(anode)<br>E<sup>0</sup>(anode) = E<sup>0</sup>(kathode) − U<sub>b</sub> = 0,34 − 0,57 = <b>−0,23 V</b><br>→ Ni<sup>2+</sup>/Ni-elektrode'},
{s:3,q:'Bereken U<sub>b</sub> van Mg-Ag cel (E<sup>0</sup>(Mg)=−2,36V, E<sup>0</sup>(Ag)=+0,80V) en schrijf de totale redoxreactie.',
a:'Anode: Mg → Mg<sup>2+</sup> + 2e<sup>−</sup><br>Kathode: Ag<sup>+</sup> + e<sup>−</sup> → Ag &nbsp;(×2)<br>Totaal: Mg + 2Ag<sup>+</sup> → Mg<sup>2+</sup> + 2Ag<br>U<sub>b</sub> = 0,80 − (−2,36) = <b>+3,16 V</b>'},
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
{s:1,q:'In een Zn-Cu galvanische cel: welk elektrode is de anode?',
a:'<b>Zn is de anode</b> (E<sup>0</sup>=−0,76V lager dan Cu +0,34V)<br>Anode: Zn → Zn<sup>2+</sup> + 2e<sup>−</sup> (oxidatie, negatiefpool)'},
{s:1,q:'Schrijf de symbolische notatie voor een Zn-Cu cel (c = 1 mol/L).',
a:'<b>Zn | Zn<sup>2+</sup>(1M) || Cu<sup>2+</sup>(1M) | Cu</b><br>Anode links, kathode rechts. || = zoutbrug.'},
{s:1,q:'Wat is de functie van de zoutbrug?',
a:'Ionentransport tussen beide halvcellen om elektrische neutraliteit te handhaven.<br>Zonder zoutbrug: positieve lading stapelt in kathodecel, negatieve in anodecel → reactie stopt.'},
{s:1,q:'Schrijf de halfreacties voor een Zn-Ag galvanische cel.',
a:'Anode: Zn → Zn<sup>2+</sup> + 2e<sup>−</sup><br>Kathode: 2Ag<sup>+</sup> + 2e<sup>−</sup> → 2Ag<br>Totaal: Zn + 2Ag<sup>+</sup> → Zn<sup>2+</sup> + 2Ag &nbsp;·&nbsp; U<sub>b</sub> = +1,56V'},
{s:2,q:'Bereken U<sub>b</sub> voor een Ni-Ag cel en schrijf de symbolische notatie.',
a:'Anode: Ni → Ni<sup>2+</sup> + 2e<sup>−</sup> (E<sup>0</sup>=−0,23V)<br>Kathode: 2Ag<sup>+</sup> + 2e<sup>−</sup> → 2Ag (E<sup>0</sup>=+0,80V)<br>U<sub>b</sub> = +1,03 V<br>Notatie: <b>Ni | Ni<sup>2+</sup>(1M) || Ag<sup>+</sup>(1M) | Ag</b>'},
{s:2,q:'Mg-anode, Pb-kathode. Schrijf de celreactie en bereken U<sub>b</sub>.',
a:'Anode: Mg → Mg<sup>2+</sup> + 2e<sup>−</sup> (E<sup>0</sup>=−2,36V)<br>Kathode: Pb<sup>2+</sup> + 2e<sup>−</sup> → Pb (E<sup>0</sup>=−0,13V)<br>Totaal: Mg + Pb<sup>2+</sup> → Mg<sup>2+</sup> + Pb<br>U<sub>b</sub> = −0,13 − (−2,36) = <b>+2,23 V</b>'},
{s:3,q:'Verklaar stap voor stap wat er in de galvanische cel gebeurt als de zoutbrug verwijderd wordt.',
a:'1) Anode-halfcel: Zn<sup>2+</sup> ophoping → positieve lading stijgt<br>2) Kathode-halfcel: Cu<sup>2+</sup> verbruikt → negatieve lading stijgt<br>3) Elektrisch onevenwicht tegenwerkt verdere ionisatie → stroom neemt snel af<br>4) Reactie stopt volledig, ondanks voldoende reactanten<br>Zoutbrug is essentieel voor continuïteit.'},
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
{s:1,q:'Wat is het verschil in energieomzetting tussen galvanische cel en elektrolyse?',
a:'Galvanische cel: <b>produceert</b> elektrische energie (vrijwillig, ΔG < 0)<br>Elektrolyse: <b>verbruikt</b> elektrische energie (niet-vrijwillig, ΔG > 0)'},
{s:1,q:'Bij elektrolyse van water: welk gas vormt zich aan de kathode?',
a:'<b>H<sub>2</sub></b> aan de kathode (reductie):<br>2H<sub>2</sub>O + 2e<sup>−</sup> → H<sub>2</sub>↑ + 2OH<sup>−</sup><br>Aan de anode: O<sub>2</sub> (oxidatie van water).'},
{s:1,q:'Bij elektrolyse van NaCl(aq): geef de producten aan kathode en anode.',
a:'Kathode: 2H<sub>2</sub>O + 2e<sup>−</sup> → H<sub>2</sub>↑ + 2OH<sup>−</sup><br>Anode: 2Cl<sup>−</sup> → Cl<sub>2</sub>↑ + 2e<sup>−</sup><br>H<sub>2</sub>O wordt gereduceerd (niet Na<sup>+</sup>) want Na<sup>+</sup> vereist een veel grotere spanning.'},
{s:1,q:'Wat is het poolteken van de anode bij elektrolyse?',
a:'<b>Positief (+)</b> — omgekeerd t.o.v. galvanische cel.<br>Externe spanningsbron duwt elektronen weg van de anode → anode = + pool; anionen worden aangetrokken.'},
{s:2,q:'Schrijf de halfreacties voor elektrolyse van gesmolten NaCl.',
a:'Kathode (−): Na<sup>+</sup> + e<sup>−</sup> → Na<br>Anode (+): 2Cl<sup>−</sup> → Cl<sub>2</sub> + 2e<sup>−</sup><br>Totaal: 2NaCl → 2Na + Cl<sub>2</sub><br>In gesmolten NaCl (geen water) → Na<sup>+</sup> gereduceerd aan kathode.'},
{s:2,q:'Bereken minimale spanning voor elektrolyse van water (E<sup>0</sup>(O<sub>2</sub>/H<sub>2</sub>O)=+1,23V, E<sup>0</sup>(H<sup>+</sup>/H<sub>2</sub>)=0,00V).',
a:'Kathode: 2H<sup>+</sup> + 2e<sup>−</sup> → H<sub>2</sub> &nbsp;(E<sup>0</sup>=0,00V)<br>Anode: H<sub>2</sub>O → ½O<sub>2</sub> + 2H<sup>+</sup> + 2e<sup>−</sup> &nbsp;(E<sup>0</sup>=+1,23V)<br>U<sub>min</sub> = 1,23 − 0,00 = <b>1,23 V</b> (in praktijk meer door overpotentiaal)'},
{s:3,q:'Vergelijk elektrolyse van NaCl(aq) vs gesmolten NaCl. Verklaar de productverschillen.',
a:'<b>NaCl(aq):</b><br>Kathode: H<sub>2</sub>O gereduceerd → H<sub>2</sub> + OH<sup>−</sup> (water makkelijker dan Na<sup>+</sup>)<br>Anode: Cl<sup>−</sup> → Cl<sub>2</sub><br>Producten: H<sub>2</sub>, Cl<sub>2</sub>, NaOH<br><b>NaCl(gesmolten):</b><br>Kathode: Na<sup>+</sup> + e<sup>−</sup> → Na (geen water aanwezig!)<br>Anode: Cl<sup>−</sup> → Cl<sub>2</sub><br>Producten: Na(l), Cl<sub>2</sub>(g)'},
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
{s:1,q:'Balanceer: MnO<sub>4</sub><sup>−</sup> → Mn<sup>2+</sup> (zuur milieu).',
a:'① O: 4H<sub>2</sub>O rechts; H: 8H<sup>+</sup> links<br>MnO<sub>4</sub><sup>−</sup> + 8H<sup>+</sup> → Mn<sup>2+</sup> + 4H<sub>2</sub>O<br>② Lading: −1+8=+7 links; +2 rechts → voeg 5e<sup>−</sup> links:<br><b>MnO<sub>4</sub><sup>−</sup> + 8H<sup>+</sup> + 5e<sup>−</sup> → Mn<sup>2+</sup> + 4H<sub>2</sub>O ✓</b>'},
{s:1,q:'Balanceer: Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup> → Cr<sup>3+</sup> (zuur milieu).',
a:'① Cr: ×2; O: 7H<sub>2</sub>O rechts; H: 14H<sup>+</sup> links<br>Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup> + 14H<sup>+</sup> → 2Cr<sup>3+</sup> + 7H<sub>2</sub>O<br>② Lading: −2+14=+12 links; +6 rechts → 6e<sup>−</sup> links:<br><b>Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup> + 14H<sup>+</sup> + 6e<sup>−</sup> → 2Cr<sup>3+</sup> + 7H<sub>2</sub>O ✓</b>'},
{s:1,q:'Schrijf de volledige reactie: Fe<sup>2+</sup> + MnO<sub>4</sub><sup>−</sup> → Fe<sup>3+</sup> + Mn<sup>2+</sup> (zuur milieu).',
a:'Reductie (×1): MnO<sub>4</sub><sup>−</sup> + 8H<sup>+</sup> + 5e<sup>−</sup> → Mn<sup>2+</sup> + 4H<sub>2</sub>O<br>Oxidatie (×5): Fe<sup>2+</sup> → Fe<sup>3+</sup> + e<sup>−</sup><br>Totaal: <b>MnO<sub>4</sub><sup>−</sup> + 5Fe<sup>2+</sup> + 8H<sup>+</sup> → Mn<sup>2+</sup> + 5Fe<sup>3+</sup> + 4H<sub>2</sub>O ✓</b>'},
{s:1,q:'Schrijf de oxidatiehalfreactie van Zn → Zn<sup>2+</sup>.',
a:'<b>Zn → Zn<sup>2+</sup> + 2e<sup>−</sup></b><br>OG stijgt van 0 naar +2 → oxidatie.<br>Lading check: 0 links = +2 − 2 = 0 rechts ✓'},
{s:2,q:'Schrijf de volledige reactie van K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub> met FeSO<sub>4</sub> in zuur milieu.',
a:'Reductie (×1): Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup> + 14H<sup>+</sup> + 6e<sup>−</sup> → 2Cr<sup>3+</sup> + 7H<sub>2</sub>O<br>Oxidatie (×6): Fe<sup>2+</sup> → Fe<sup>3+</sup> + e<sup>−</sup><br>Totaal: <b>Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup> + 6Fe<sup>2+</sup> + 14H<sup>+</sup> → 2Cr<sup>3+</sup> + 6Fe<sup>3+</sup> + 7H<sub>2</sub>O</b>'},
{s:2,q:'Balanceer: MnO<sub>4</sub><sup>−</sup> + H<sub>2</sub>O<sub>2</sub> → Mn<sup>2+</sup> + O<sub>2</sub> (zuur milieu).',
a:'Reductie (×2): MnO<sub>4</sub><sup>−</sup>+8H<sup>+</sup>+5e<sup>−</sup>→Mn<sup>2+</sup>+4H<sub>2</sub>O<br>Oxidatie (×5): H<sub>2</sub>O<sub>2</sub>→O<sub>2</sub>+2H<sup>+</sup>+2e<sup>−</sup><br>Totaal: <b>2MnO<sub>4</sub><sup>−</sup>+5H<sub>2</sub>O<sub>2</sub>+6H<sup>+</sup>→2Mn<sup>2+</sup>+5O<sub>2</sub>+8H<sub>2</sub>O</b>'},
{s:3,q:'Balanceer in <b>basisch milieu</b>: MnO<sub>4</sub><sup>−</sup> → MnO<sub>2</sub>.',
a:'① O: 4→2 → +2H<sub>2</sub>O rechts; H: 0→4 → voeg 4H<sub>2</sub>O links en 4OH<sup>−</sup> rechts<br>MnO<sub>4</sub><sup>−</sup> + 2H<sub>2</sub>O → MnO<sub>2</sub> + 4OH<sup>−</sup><br>② Lading: −1 links; −4 rechts → voeg 3e<sup>−</sup> links:<br><b>MnO<sub>4</sub><sup>−</sup> + 2H<sub>2</sub>O + 3e<sup>−</sup> → MnO<sub>2</sub> + 4OH<sup>−</sup> ✓</b>'},
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
{q:'Wat is een zuur volgens Brønsted-Lowry?',o:['Een protondonor','Een OH<sup>−</sup>-leverancier','Een elektronenacceptor','Een H<sub>2</sub>O-generator'],c:0,e:'Brønsted-zuur = protondonor: geeft H<sup>+</sup> af aan een base.'},
{q:'Wat is de geconjugeerde base van CH<sub>3</sub>COOH?',o:['CH<sub>3</sub>COO<sup>−</sup>','CH<sub>3</sub>COOH<sub>2</sub><sup>+</sup>','CH<sub>3</sub>OH','CH<sub>4</sub>'],c:0,e:'Geconjugeerde base = zuur − 1 proton: CH<sub>3</sub>COOH − H<sup>+</sup> = CH<sub>3</sub>COO<sup>−</sup>.'},
{q:'Welk deeltje is amfoter?',o:['H<sub>3</sub>O<sup>+</sup>','OH<sup>−</sup>','HCO<sub>3</sub><sup>−</sup>','Cl<sup>−</sup>'],c:2,e:'HCO<sub>3</sub><sup>−</sup> kan proton afstaan (→CO<sub>3</sub><sup>2−</sup>) én opnemen (→H<sub>2</sub>CO<sub>3</sub>).'},
{q:'Wat is de waarde van K<sub>w</sub> bij 25°C?',o:['10<sup>−7</sup> mol/L','10<sup>−14</sup> mol/L','10<sup>−7</sup> mol<sup>2</sup>/L<sup>2</sup>','1,0×10<sup>−14</sup> mol<sup>2</sup>/L<sup>2</sup>'],c:3,e:'K<sub>w</sub> = [H<sub>3</sub>O<sup>+</sup>][OH<sup>−</sup>] heeft eenheid mol<sup>2</sup>/L<sup>2</sup>, waarde 1,0×10<sup>−14</sup>.'},
{q:'Als pH = 3, wat is pOH?',o:['pOH = 11','pOH = 7','pOH = 17','pOH = 3'],c:0,e:'pH + pOH = 14 → pOH = 14 − 3 = 11.'},
{q:'Bereken pH van 0,01 mol/L HCl.',o:['pH = 1','pH = 2','pH = 12','pH = 13'],c:1,e:'[H<sub>3</sub>O<sup>+</sup>] = 0,01 = 10<sup>−2</sup> → pH = 2.'},
{q:'Wat is [OH<sup>−</sup>] in een oplossing met pH = 11?',o:['10<sup>−3</sup> mol/L','10<sup>−11</sup> mol/L','10<sup>−1</sup> mol/L','10<sup>−14</sup> mol/L'],c:0,e:'pOH = 14−11 = 3 → [OH<sup>−</sup>] = 10<sup>−3</sup> mol/L.'},
{q:'Welk zuur is het sterkst?',o:['pK<sub>z</sub> = 9,2','pK<sub>z</sub> = 4,76','pK<sub>z</sub> = 1,92','pK<sub>z</sub> = 7,54'],c:2,e:'Kleinste pK<sub>z</sub> = grootste K<sub>z</sub> = meeste ionisatie = sterkste zuur.'},
{q:'Bereken [H<sub>3</sub>O<sup>+</sup>] in 0,1 mol/L CH<sub>3</sub>COOH (K<sub>z</sub>=1,74×10<sup>−5</sup>).',o:['1,74×10<sup>−3</sup> mol/L','1,32×10<sup>−3</sup> mol/L','1,74×10<sup>−5</sup> mol/L','1,00×10<sup>−7</sup> mol/L'],c:1,e:'√(1,74×10<sup>−5</sup>×0,1) = √(1,74×10<sup>−6</sup>) = 1,32×10<sup>−3</sup> mol/L.'},
{q:'Een oplossing van NH<sub>4</sub>Cl is:',o:['Neutraal (pH=7)','Basisch (pH>7)','Zuur (pH<7)','Sterk basisch'],c:2,e:'NH<sub>4</sub><sup>+</sup> is geconj. zuur van NH<sub>3</sub>: NH<sub>4</sub><sup>+</sup> ⇌ H<sup>+</sup> + NH<sub>3</sub> → zure oplossing.'},
{q:'Hoe luidt de valentiewet?',o:['n<sub>z</sub>·c<sub>z</sub>·V<sub>z</sub> = n<sub>b</sub>·c<sub>b</sub>·V<sub>b</sub>','c<sub>z</sub>·V<sub>z</sub> = c<sub>b</sub>·V<sub>b</sub>','c<sub>z</sub>/V<sub>z</sub> = c<sub>b</sub>/V<sub>b</sub>','M<sub>z</sub>·c<sub>z</sub> = M<sub>b</sub>·c<sub>b</sub>'],c:0,e:'De valentiewet houdt rekening met het aantal H<sup>+</sup>/OH<sup>−</sup> per formule-eenheid (valentie n).'},
{q:'Wat is de Henderson-Hasselbalch formule?',o:['pH = pK<sub>z</sub> + log([HA]/[A<sup>−</sup>])','pH = pK<sub>z</sub> − log([A<sup>−</sup>]/[HA])','pH = pK<sub>z</sub> + log([A<sup>−</sup>]/[HA])','pH = K<sub>z</sub> + log([A<sup>−</sup>]/[HA])'],c:2,e:'pH = pK<sub>z</sub> + log([A<sup>−</sup>]/[HA]) — base in teller, zuur in noemer.'},
{q:'Welk paar vormt een buffer?',o:['HCl + NaCl','CH<sub>3</sub>COOH + CH<sub>3</sub>COONa','NaOH + H<sub>2</sub>O','HNO<sub>3</sub> + KNO<sub>3</sub>'],c:1,e:'Buffer = zwak zuur + zout van zijn geconjugeerde base.'},
{q:'Bereken pK<sub>z</sub> van HCOOH (K<sub>z</sub>=1,77×10<sup>−4</sup>).',o:['pK<sub>z</sub> = 3,75','pK<sub>z</sub> = 4,76','pK<sub>z</sub> = 7,54','pK<sub>z</sub> = 1,77'],c:0,e:'pK<sub>z</sub> = −log(1,77×10<sup>−4</sup>) = 4 − log(1,77) ≈ 3,75.'},
{q:'Wat geldt voor K<sub>z</sub>·K<sub>b</sub> van een geconjugeerd paar?',o:['K<sub>z</sub>·K<sub>b</sub> = 10<sup>−7</sup>','K<sub>z</sub>·K<sub>b</sub> = 10<sup>−14</sup>','K<sub>z</sub>·K<sub>b</sub> = 1','K<sub>z</sub>·K<sub>b</sub> = K<sub>w</sub><sup>2</sup>'],c:1,e:'K<sub>z</sub>·K<sub>b</sub> = K<sub>w</sub> = 10<sup>−14</sup> bij 25°C.'},
{q:'In HCl + H<sub>2</sub>O → H<sub>3</sub>O<sup>+</sup> + Cl<sup>−</sup>: welk deeltje is de Brønsted-base?',o:['HCl','Cl<sup>−</sup>','H<sub>2</sub>O','H<sub>3</sub>O<sup>+</sup>'],c:2,e:'H<sub>2</sub>O neemt een proton op van HCl → protonacceptor = base.'},
{q:'Bereken pH van 0,1 mol/L NaOH.',o:['pH = 1','pH = 7','pH = 13','pH = 14'],c:2,e:'[OH<sup>−</sup>] = 0,1 → pOH = 1 → pH = 13.'},
{q:'Wat is de geconjugeerde base van H<sub>2</sub>O?',o:['H<sub>3</sub>O<sup>+</sup>','OH<sup>−</sup>','O<sup>2−</sup>','H<sub>2</sub>O zelf'],c:1,e:'H<sub>2</sub>O als zuur: H<sub>2</sub>O − H<sup>+</sup> = OH<sup>−</sup>.'},
{q:'Een buffer heeft pH = pK<sub>z</sub> als:',o:['[A<sup>−</sup>] > [HA]','[HA] > [A<sup>−</sup>]','[A<sup>−</sup>] = [HA]','de concentraties heel laag zijn'],c:2,e:'log([A<sup>−</sup>]/[HA]) = log(1) = 0 → pH = pK<sub>z</sub>.'},
{q:'Welke is een STERK zuur?',o:['CH<sub>3</sub>COOH','HF','HNO<sub>3</sub>','H<sub>2</sub>CO<sub>3</sub>'],c:2,e:'HNO<sub>3</sub> ioniseert volledig. De andere zijn zwakke zuren.'},
{q:'Bereken pH van 0,1 mol/L CH<sub>3</sub>COOH (K<sub>z</sub>=1,74×10<sup>−5</sup>). Kies dichtstbijzijnde.',o:['pH ≈ 2,88','pH ≈ 4,76','pH ≈ 5,00','pH ≈ 1,96'],c:0,e:'[H<sub>3</sub>O<sup>+</sup>]=1,32×10<sup>−3</sup> → pH=−log(1,32×10<sup>−3</sup>)=2,88.'},
{q:'25 mL 0,1 M HCl + 0,1 M NaOH. Welk volume NaOH verbruikt?',o:['12,5 mL','25,0 mL','50,0 mL','20,0 mL'],c:1,e:'1·0,1·25 = 1·0,1·V → V = 25 mL.'},
{q:'pH van puur water bij 25°C?',o:['0','6','7','14'],c:2,e:'[H<sub>3</sub>O<sup>+</sup>] = 10<sup>−7</sup> → pH = 7.'},
{q:'Wat is [H<sub>3</sub>O<sup>+</sup>] bij pH = 4?',o:['4 mol/L','10<sup>−4</sup> mol/L','10<sup>−10</sup> mol/L','10<sup>−4</sup> mol<sup>2</sup>/L<sup>2</sup>'],c:1,e:'[H<sub>3</sub>O<sup>+</sup>] = 10<sup>−pH</sup> = 10<sup>−4</sup> mol/L.'},
{q:'K<sub>b</sub> van CH<sub>3</sub>COO<sup>−</sup> (K<sub>z</sub>=1,74×10<sup>−5</sup>)?',o:['5,75×10<sup>−10</sup>','1,74×10<sup>−5</sup>','1,00×10<sup>−7</sup>','1,74×10<sup>−9</sup>'],c:0,e:'K<sub>b</sub> = K<sub>w</sub>/K<sub>z</sub> = 10<sup>−14</sup>/1,74×10<sup>−5</sup> = 5,75×10<sup>−10</sup>.'},
{q:'NaHCO<sub>3</sub>-oplossing is:',o:['Zuur (HCO<sub>3</sub><sup>−</sup> is zuur)','Neutraal (pH=7)','Licht basisch (amfoter, K<sub>b</sub>>K<sub>z</sub>)','Sterk basisch'],c:2,e:'HCO<sub>3</sub><sup>−</sup> amfoter, maar K<sub>b</sub> > K<sub>z</sub> → overwegend basisch.'},
{q:'Welke stelling over buffer is ONJUIST?',o:['Weerstaat pH-verandering','Bestaat uit zwak zuur + geconj. base','Heeft vaste pH ongeacht hoeveel zuur/base toegevoegd','Bloedbuffer gebruikt HCO<sub>3</sub><sup>−</sup>/CO<sub>2</sub>'],c:2,e:'Onjuist: buffers hebben beperkte capaciteit; bij teveel zuur/base faalt de buffer.'},
{q:'pH van buffer: 0,1 M CH<sub>3</sub>COOH + 0,2 M CH<sub>3</sub>COO<sup>−</sup> (pK<sub>z</sub>=4,76)?',o:['pH = 4,46','pH = 4,76','pH = 5,06','pH = 5,36'],c:2,e:'pH = 4,76 + log(0,2/0,1) = 4,76 + 0,30 = 5,06.'},
{q:'Equivalentiepunt bij titratie is:',o:['Punt waar pH=7','Punt waar alle zuur geneutraliseerd is','Punt waar indicator verandert','Punt waar oplossing neutraal is'],c:1,e:'Equivalentiepunt = stoichiometrisch punt. pH=7 enkel bij sterk zuur + sterke base.'},
{q:'Welk zuur heeft de kleinste K<sub>z</sub>?',o:['HCOOH (1,77×10<sup>−4</sup>)','CH<sub>3</sub>COOH (1,74×10<sup>−5</sup>)','HClO (2,88×10<sup>−8</sup>)','HF (~6,8×10<sup>−4</sup>)'],c:2,e:'HClO: K<sub>z</sub>=2,88×10<sup>−8</sup> is het kleinst → zwakste van de vier.'},
],
H4:[
{q:'Wat is het OG van S in H<sub>2</sub>SO<sub>4</sub>?',o:['+4','+6','−2','+2'],c:1,e:'2(+1)+S+4(−2)=0 → S=+6.'},
{q:'Wat is het OG van N in NO<sub>3</sub><sup>−</sup>?',o:['+3','+5','−3','+1'],c:1,e:'N+3(−2)=−1 → N=+5.'},
{q:'Wat is het OG van Mn in KMnO<sub>4</sub>?',o:['+4','+2','+7','+6'],c:2,e:'(+1)+Mn+4(−2)=0 → Mn=+7.'},
{q:'Is Mg + Cu<sup>2+</sup> → Mg<sup>2+</sup> + Cu spontaan?',o:['Nee, E<sup>0</sup>(Mg)>E<sup>0</sup>(Cu)','Ja, Mg is sterkere reductor','Nee, Cu is sterkere reductor','Onbekend zonder extra info'],c:1,e:'E<sup>0</sup>(Mg)=−2,36V << E<sup>0</sup>(Cu)=+0,34V → Mg sterkere reductor → spontaan.'},
{q:'U<sub>b</sub> voor Ni-Cu cel? (E<sup>0</sup>(Ni)=−0,23V, E<sup>0</sup>(Cu)=+0,34V)',o:['−0,57 V','+0,11 V','+0,57 V','+0,34 V'],c:2,e:'Ni=anode, Cu=kathode: U<sub>b</sub>=0,34−(−0,23)=+0,57V.'},
{q:'In een galvanische cel is de anode:',o:['Reductie, positieve pool','Oxidatie, negatieve pool','Waar elektronen binnenkomen','Altijd links geplaatst'],c:1,e:'Anode = oxidatie = negatieve pool (−).'},
{q:'Symbolische schrijfwijze Zn-Cu cel:',o:['Cu|Cu<sup>2+</sup>||Zn<sup>2+</sup>|Zn','Zn|Zn<sup>2+</sup>||Cu<sup>2+</sup>|Cu','Zn<sup>2+</sup>|Zn||Cu|Cu<sup>2+</sup>','Cu<sup>2+</sup>|Cu||Zn|Zn<sup>2+</sup>'],c:1,e:'Anode links, kathode rechts: Zn|Zn<sup>2+</sup>||Cu<sup>2+</sup>|Cu.'},
{q:'Functie van de zoutbrug:',o:['Elektronen transporteren','Spanning verhogen','Ionentransport om lading te compenseren','Elektrolyt vernieuwen'],c:2,e:'Zoutbrug transporteert ionen voor elektrische neutraliteit.'},
{q:'Verschil elektrolyse vs galvanische cel:',o:['Elektrolyse gebruikt zoutbrug','Galvanisch verbruikt elektrische energie','Elektrolyse is niet-vrijwillig en vereist externe energie','Galvanisch heeft slechts één elektrode'],c:2,e:'Elektrolyse = niet-vrijwillig (ΔG>0) → externe spanning nodig.'},
{q:'Kathode bij elektrolyse van NaCl(aq):',o:['Cl<sub>2</sub>','O<sub>2</sub>','H<sub>2</sub> en OH<sup>−</sup>','Na'],c:2,e:'In waterige oplossing: H<sub>2</sub>O gereduceerd aan kathode → H<sub>2</sub>.'},
{q:'OG van Cr in K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>:',o:['+3','+6','+7','+4'],c:1,e:'2(+1)+2Cr+7(−2)=0 → Cr=+6.'},
{q:'Sterkste reductor:',o:['Cu','Fe','Zn','Mg'],c:3,e:'Mg: E<sup>0</sup>=−2,36V — laagste in de reeks = sterkste reductor.'},
{q:'U<sub>b</sub> Zn-Ag cel (E<sup>0</sup>(Zn)=−0,76V, E<sup>0</sup>(Ag)=+0,80V):',o:['+0,04V','+1,56V','−1,56V','+0,80V'],c:1,e:'U<sub>b</sub>=0,80−(−0,76)=+1,56V.'},
{q:'Oxidatiehalfreactie van ijzer:',o:['Fe<sup>2+</sup>+2e<sup>−</sup>→Fe','Fe→Fe<sup>2+</sup>+2e<sup>−</sup>','Fe<sup>3+</sup>+3e<sup>−</sup>→Fe','Fe+2H<sup>+</sup>→Fe<sup>2+</sup>+H<sub>2</sub>'],c:1,e:'Fe→Fe<sup>2+</sup>+2e<sup>−</sup>: OG stijgt 0→+2 = oxidatie.'},
{q:'U<sub>b</sub> = −0,45V betekent:',o:['Spontaan','Niet spontaan, vereist energie','Evenwichtsreactie','Onmogelijk'],c:1,e:'U<sub>b</sub><0 → ΔG>0 → niet spontaan.'},
{q:'OG van Fe in Fe<sub>3</sub>O<sub>4</sub>:',o:['+2','+3','+8/3 (gemiddeld)','+4'],c:2,e:'Fe<sub>3</sub>O<sub>4</sub> bevat Fe<sup>2+</sup> en Fe<sup>3+</sup>; gemiddeld OG=8/3.'},
{q:'In Pb-Sn cel (E<sup>0</sup>(Pb)=−0,13V, E<sup>0</sup>(Sn)=−0,14V): welk is anode?',o:['Pb','Sn','Beide','Kan niet bepaald worden'],c:1,e:'Sn: lager E<sup>0</sup>=−0,14V → anode.'},
{q:'Galvanisering is een toepassing van:',o:['Galvanische cel','Elektrolyse','Corrosiebeveiliging','Redoxtitratie'],c:1,e:'Galvanisering = elektrolytisch aanbrengen van metaallaag.'},
{q:'OG van H in NaH:',o:['+1','0','−1','+2'],c:2,e:'Metaalhydride: H=−1.'},
{q:'In MnO<sub>4</sub><sup>−</sup>+8H<sup>+</sup>+5e<sup>−</sup>→Mn<sup>2+</sup>+4H<sub>2</sub>O:',o:['Mn geoxideerd +7→+2','Mn gereduceerd +7→+2','Mn gereduceerd +4→+2','Mn geoxideerd +2→+7'],c:1,e:'Mn: +7→+2 = OG daalt = reductie.'},
{q:'U<sub>b</sub> Fe-Cu cel (E<sup>0</sup>(Fe)=−0,44V, E<sup>0</sup>(Cu)=+0,34V):',o:['+0,78V','+0,10V','−0,10V','−0,78V'],c:0,e:'U<sub>b</sub>=0,34−(−0,44)=+0,78V.'},
{q:'Juiste bewering over galvanische cel:',o:['Anode is positief','Elektronen: kathode→anode','Kathode = reductie','Zoutbrug geleidt elektronen'],c:2,e:'Kathode = reductie = positieve pool.'},
{q:'OG van S in SO<sub>2</sub>:',o:['−2','+4','+6','+2'],c:1,e:'S+2(−2)=0 → S=+4.'},
{q:'Sterkste oxidatiemiddel:',o:['Mg<sup>2+</sup>','Zn<sup>2+</sup>','Fe<sup>2+</sup>','Ag<sup>+</sup>'],c:3,e:'Ag<sup>+</sup>: hoogste E<sup>0</sup>(+0,80V) = sterkste oxidans.'},
{q:'Product aan de anode bij elektrolyse van water:',o:['H<sub>2</sub>','O<sub>2</sub>','OH<sup>−</sup>','H<sup>+</sup>'],c:1,e:'Anode=oxidatie: H<sub>2</sub>O→½O<sub>2</sub>+2H<sup>+</sup>+2e<sup>−</sup>.'},
{q:'E<sup>0</sup>(kathode)=+0,34V, E<sup>0</sup>(anode)=−0,23V. U<sub>b</sub>=?',o:['+0,57V','+0,11V','−0,57V','+0,34V'],c:0,e:'U<sub>b</sub>=0,34−(−0,23)=+0,57V.'},
{q:'OG van P in PO<sub>4</sub><sup>3−</sup>:',o:['+3','+5','−3','+4'],c:1,e:'P+4(−2)=−3 → P=+5.'},
{q:'Gesmolten NaCl elektrolyse: kathode?',o:['Na<sup>+</sup> geoxideerd','Cl<sup>−</sup> gereduceerd','Na gevormd aan kathode','Cl<sub>2</sub> aan kathode'],c:2,e:'Geen water → Na<sup>+</sup>+e<sup>−</sup>→Na aan kathode.'},
{q:'OG van Zn in ZnCl<sub>2</sub>:',o:['0','+1','+2','−2'],c:2,e:'2Cl=−2; Zn=+2 zodat ΣOG=0.'},
{q:'Methode voor redoxreacties balanceren:',o:['Valentielijnmethode','Ionenpaarmethode','Halfreactiemethode','OG-methode'],c:2,e:'Halfreactiemethode: oxidatie en reductie apart balanceren dan samentellen.'},
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
  const goSec = (cid, sid) => { setChId(cid); setSecId(sid); setOpen({}); setStepsOpen(false); setScreen('section'); };
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
        Sint-Jan Berchmanscollege · Antwerpen
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

        {/* Extended theory paragraph */}
        {TH_EXT[sec.id] && (
          <p style={{
            fontSize:14,lineHeight:1.75,textAlign:'justify',
            textIndent:'1.4em',margin:'0 0 14px',color:P.ink,
          }} dangerouslySetInnerHTML={{__html:TH_EXT[sec.id]}}/>
        )}

        {/* Theorie bullets */}
        {subHeader('Kernpunten')}
        <div style={{paddingLeft:6}}>
          {sec.th.map((b,i)=>(
            <div key={i} style={{display:'flex',gap:10,marginBottom:8,fontSize:13.5,lineHeight:1.65}}>
              <span style={{color:P.sepia,flexShrink:0,fontWeight:700,fontFamily:FONT_S}}>{['i.','ii.','iii.','iv.','v.','vi.'][i]||'·'}</span>
              <span dangerouslySetInnerHTML={{__html:b}}/>
            </div>
          ))}
        </div>

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

        {/* Stappenplan (uitklapbaar) */}
        {STEPS[sec.id] && (
          <>
            {subHeader('Werkwijze')}
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
                <ol style={{margin:0,padding:'10px 14px 12px 30px',fontSize:13,lineHeight:1.7,color:P.ink}}>
                  {STEPS[sec.id].map((s,i)=>(
                    <li key={i} style={{marginBottom:6}}>
                      <span dangerouslySetInnerHTML={{__html:s}}/>
                    </li>
                  ))}
                </ol>
              )}
            </div>
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
