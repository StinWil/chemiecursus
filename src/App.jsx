import { useState } from "react";

// ── PALETTE ──────────────────────────────────────────────────────────────────
const P = {
  bg:'#fafaf8', card:'#fff', muted:'#f3f2ef',
  bdr:'#e7e5e0', txt:'#1c1917', soft:'#78716c',
  H3:{acc:'#b45309',tint:'#fffbeb',chip:'#fef3c7',bdr:'#fde68a'},
  H4:{acc:'#0f766e',tint:'#f0fdfa',chip:'#ccfbf1',bdr:'#99f6e4'},
  vio:{acc:'#7c3aed',tint:'#faf5ff',chip:'#ede9fe',bdr:'#c4b5fd'},
  ok:{txt:'#15803d',bg:'#f0fdf4'},
  err:{txt:'#b91c1c',bg:'#fef2f2'},
  s1:'#f59e0b', s2:'#ea580c', s3:'#dc2626',
};

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

// ── FORMULARIUM DATA ──────────────────────────────────────────────────────────
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
{title:'Zwakke zuren — Kz-waarden (tabellenbundel, 25°C)',heads:['Stof','Formule','K<sub>z</sub>','pK<sub>z</sub>'],rows:[
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

// ── STAR STYLES ───────────────────────────────────────────────────────────────
const STAR={
1:{lbl:'★ Basis',c:'#f59e0b',bg:'#fef9c3'},
2:{lbl:'★★ Uitdagend',c:'#ea580c',bg:'#fff7ed'},
3:{lbl:'★★★ Expert',c:'#dc2626',bg:'#fef2f2'},
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function App() {
const [course, setCourse] = useState('CHE2');
const [screen, setScreen] = useState('home');
const [chId, setChId] = useState(null);
const [secId, setSecId] = useState(null);
const [open, setOpen] = useState({});
const [ts, setTs] = useState(null);

const secs = chId ? SEC[chId] : [];
const sec = secs.find(s => s.id === secId) || null;
const col = chId === 'H3' ? P.H3 : P.H4;

const toggle = k => setOpen(o => ({...o,[k]:!o[k]}));

const goHome = () => setScreen('home');
const goChap = id => { setChId(id); setScreen('chapter'); };
const goSec = (cid, sid) => { setChId(cid); setSecId(sid); setOpen({}); setScreen('section'); };
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

// ── STYLES ────────────────────────────────────────────────
const root = {height:'100dvh',background:P.bg,fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",display:'flex',flexDirection:'column',overflow:'hidden',color:P.txt,fontSize:15};
const hdr = {padding:'10px 14px',borderBottom:`1px solid ${P.bdr}`,background:P.card,flexShrink:0,display:'flex',alignItems:'center',gap:10};
const body = {flex:1,overflowY:'auto',padding:14,paddingBottom:32};
const card = (extra={}) => ({background:P.card,borderRadius:12,border:`1px solid ${P.bdr}`,padding:14,marginBottom:10,...extra});
const btn = (bg,c,sm) => ({background:bg,color:c,border:'none',borderRadius:8,padding:sm?'7px 12px':'11px 16px',fontSize:sm?13:14,fontWeight:600,cursor:'pointer',minHeight:sm?34:44,display:'inline-flex',alignItems:'center',justifyContent:'center'});
const chip = (bg,c) => ({background:bg,color:c,borderRadius:6,padding:'2px 8px',fontSize:12,fontWeight:700,flexShrink:0,display:'inline-block'});

// ── HOME ─────────────────────────────────────────────────────────────────────
if (screen==='home') return (
  <div style={root}>
    <div style={{...hdr,justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
      <span style={{fontWeight:800,fontSize:17,letterSpacing:-0.5}}>⚗️ Chemiecursus 6e jaar</span>
      <div style={{display:'flex',gap:5}}>
        {['CHE1','CHE2'].map(c=>(
          <button key={c} onClick={()=>setCourse(c)} style={{
            ...btn(course===c?P.txt:P.muted,course===c?P.card:P.soft,true),
            border:`1px solid ${course===c?P.txt:P.bdr}`,
          }}>{c}</button>
        ))}
      </div>
    </div>
    <div style={body}>
      <p style={{color:P.soft,fontSize:13,margin:'0 0 14px',lineHeight:1.5}}>
        Kies een hoofdstuk · {course==='CHE1'?'Sommige secties zijn CHE2-only':'Alle secties beschikbaar'}
      </p>
      {[
        {id:'H3',icon:'🧪',t:'H3 — Zuren en Basen',col:P.H3},
        {id:'H4',icon:'⚡',t:'H4 — Redoxevenwichten',col:P.H4},
      ].map(ch=>{
        const n = SEC[ch.id].filter(s=>course==='CHE2'||s.c1).length;
        return (
          <div key={ch.id} onClick={()=>goChap(ch.id)} style={{
            ...card({border:`1px solid ${ch.col.bdr}`,background:ch.col.tint,cursor:'pointer',padding:18}),
          }}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
              <span style={{fontSize:26}}>{ch.icon}</span>
              <span style={{fontWeight:800,fontSize:18,color:ch.col.acc,letterSpacing:-0.5}}>{ch.t}</span>
            </div>
            <div style={{color:P.soft,fontSize:13,marginBottom:12}}>
              {n} secties &nbsp;·&nbsp; formularium &nbsp;·&nbsp; test (5 vragen)
            </div>
            <span style={chip(ch.col.chip,ch.col.acc)}>Tap om te openen →</span>
          </div>
        );
      })}
    </div>
  </div>
);

// ── CHAPTER ───────────────────────────────────────────────────────────────────
if (screen==='chapter') return (
  <div style={root}>
    <div style={hdr}>
      <button onClick={goHome} style={btn(P.muted,P.txt,true)}>← Home</button>
      <span style={{fontWeight:700,fontSize:15,color:col.acc}}>{chId==='H3'?'H3 Zuren en Basen':'H4 Redoxevenwichten'}</span>
    </div>
    <div style={body}>
      {secs.map(s=>{
        const locked = course==='CHE1' && !s.c1;
        return (
          <div key={s.id} onClick={()=>!locked&&goSec(chId,s.id)} style={{
            display:'flex',alignItems:'center',padding:'13px 14px',
            borderRadius:10,marginBottom:6,
            border:`1px solid ${locked?P.bdr:col.bdr}`,
            background:locked?P.muted:P.card,
            opacity:locked?0.6:1,
            cursor:locked?'default':'pointer',
            gap:12,minHeight:56,
          }}>
            <div style={chip(col.chip,col.acc)}>{s.id}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:600,fontSize:14}}>{s.t}</div>
              <div style={{color:P.soft,fontSize:12,marginTop:1}} dangerouslySetInnerHTML={{__html:s.sub}} />
            </div>
            {locked && <span style={chip('#e7e5e0',P.soft)}>CHE2</span>}
            {!locked && <span style={{color:P.soft,fontSize:12}}>›</span>}
          </div>
        );
      })}

      {chId==='H4' && course==='CHE2' && (
        <>
          <div style={{height:1,background:P.bdr,margin:'8px 0'}} />
          <div onClick={goComp} style={{
            display:'flex',alignItems:'center',padding:'13px 14px',
            borderRadius:10,marginBottom:6,
            border:`1px solid ${P.vio.bdr}`,background:P.vio.tint,
            cursor:'pointer',gap:12,minHeight:56,
          }}>
            <div style={chip(P.vio.chip,P.vio.acc)}>⚡</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:600,fontSize:14,color:P.vio.acc}}>Galvanische cel vs Elektrolyse</div>
              <div style={{color:P.soft,fontSize:12}}>Vergelijkingstabel</div>
            </div>
            <span style={{color:P.vio.acc,fontSize:12}}>›</span>
          </div>
        </>
      )}

      <div style={{height:1,background:P.bdr,margin:'10px 0'}} />
      <div onClick={()=>goForm(chId)} style={{
        display:'flex',alignItems:'center',padding:'13px 14px',
        borderRadius:10,marginBottom:6,
        border:`1px solid ${P.bdr}`,background:P.card,cursor:'pointer',gap:12,minHeight:56,
      }}>
        <span style={{fontSize:20}}>📐</span>
        <span style={{fontWeight:600,fontSize:14}}>Formularium {chId}</span>
        <span style={{color:P.soft,fontSize:12,marginLeft:'auto'}}>›</span>
      </div>
      <div onClick={()=>goTest(chId)} style={{
        display:'flex',alignItems:'center',padding:'13px 14px',
        borderRadius:10,marginBottom:6,
        border:`1px solid ${P.vio.bdr}`,background:P.vio.tint,cursor:'pointer',gap:12,minHeight:56,
      }}>
        <span style={{fontSize:20}}>🧪</span>
        <span style={{fontWeight:600,fontSize:14,color:P.vio.acc}}>Test jezelf — 5 vragen</span>
        <span style={{color:P.vio.acc,fontSize:12,marginLeft:'auto'}}>›</span>
      </div>
    </div>
  </div>
);

// ── SECTION ───────────────────────────────────────────────────────────────────
if (screen==='section' && sec) return (
  <div style={root}>
    <div style={hdr}>
      <button onClick={()=>goChap(chId)} style={btn(P.muted,P.txt,true)}>← {chId}</button>
      <span style={{fontWeight:700,fontSize:14,color:col.acc,overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{sec.id} {sec.t}</span>
    </div>
    <div style={body}>
      {/* Theory */}
      <div style={card({borderColor:col.bdr,background:col.tint})}>
        <div style={{fontWeight:700,fontSize:11,textTransform:'uppercase',letterSpacing:1,color:col.acc,marginBottom:10}}>Theorie</div>
        {sec.th.map((b,i)=>(
          <div key={i} style={{display:'flex',gap:8,marginBottom:7}}>
            <span style={{color:col.acc,flexShrink:0,fontWeight:700}}>•</span>
            <span style={{fontSize:13,lineHeight:1.6}} dangerouslySetInnerHTML={{__html:b}} />
          </div>
        ))}
      </div>

      {/* Formulas */}
      <div style={card({borderColor:col.bdr,background:col.tint})}>
        <div style={{fontWeight:700,fontSize:11,textTransform:'uppercase',letterSpacing:1,color:col.acc,marginBottom:8}}>Formules</div>
        <div style={{fontFamily:"'Courier New',monospace",fontSize:13,lineHeight:1.9,background:P.card,borderRadius:8,padding:12,border:`1px solid ${col.bdr}`}}
          dangerouslySetInnerHTML={{__html:sec.fm.replace(/\n/g,'<br>')}} />
      </div>

      {/* Exercises */}
      <div style={{fontWeight:700,fontSize:11,textTransform:'uppercase',letterSpacing:1,color:P.soft,margin:'14px 0 8px'}}>Oefeningen</div>
      {sec.exo.map((ex,i)=>{
        const k=`${chId}_${sec.id}_${i}`;
        const isOpen=open[k];
        const st=STAR[ex.s];
        return (
          <div key={k} style={card({borderColor:st.c,marginBottom:8})}>
            <span style={{...chip(st.bg,st.c),marginBottom:8,display:'inline-block'}}>{st.lbl}</span>
            <div style={{fontSize:13,lineHeight:1.65,marginBottom:10}} dangerouslySetInnerHTML={{__html:ex.q}} />
            <button onClick={()=>toggle(k)} style={{
              ...btn(isOpen?P.muted:col.tint,isOpen?P.txt:col.acc,true),
              border:`1px solid ${col.bdr}`,width:'100%',textAlign:'left',
            }}>
              {isOpen?'▲ Verberg antwoord':'▼ Toon antwoord + uitleg'}
            </button>
            {isOpen && (
              <div style={{marginTop:10,padding:12,background:P.ok.bg,borderRadius:8,border:'1px solid #bbf7d0',fontSize:13,lineHeight:1.7}}
                dangerouslySetInnerHTML={{__html:ex.a}} />
            )}
          </div>
        );
      })}
    </div>
  </div>
);

// ── FORMULARIUM ───────────────────────────────────────────────────────────────
if (screen==='formularium') {
  const fd = FORM[chId];
  return (
    <div style={root}>
      <div style={hdr}>
        <button onClick={()=>goChap(chId)} style={btn(P.muted,P.txt,true)}>← {chId}</button>
        <span style={{fontWeight:700,fontSize:14,color:col.acc}}>📐 Formularium {chId}</span>
      </div>
      <div style={body}>
        <div style={card({borderColor:col.bdr,background:col.tint})}>
          <div style={{fontWeight:700,fontSize:11,textTransform:'uppercase',letterSpacing:1,color:col.acc,marginBottom:12}}>Formules</div>
          {fd.fmls.map((f,i)=>(
            <div key={i} style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:7,padding:'6px 10px',background:P.card,borderRadius:8}}>
              <span style={{color:P.soft,fontSize:11,minWidth:95,flexShrink:0}}>{f.n}</span>
              <span style={{fontFamily:"'Courier New',monospace",fontSize:13}} dangerouslySetInnerHTML={{__html:f.f}} />
            </div>
          ))}
        </div>

        {fd.tabs.map((tab,ti)=>(
          <div key={ti} style={card({overflowX:'auto',padding:0})}>
            <div style={{padding:'10px 14px',fontWeight:700,fontSize:11,textTransform:'uppercase',letterSpacing:1,color:P.soft,borderBottom:`1px solid ${P.bdr}`}}>{tab.title}</div>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
              <thead>
                <tr>{tab.heads.map((h,hi)=>(
                  <th key={hi} style={{textAlign:'left',padding:'7px 12px',background:col.chip,color:col.acc,borderBottom:`2px solid ${col.bdr}`,fontWeight:700,fontSize:12}}
                    dangerouslySetInnerHTML={{__html:h}} />
                ))}</tr>
              </thead>
              <tbody>
                {tab.rows.map((row,ri)=>(
                  <tr key={ri} style={{background:ri%2===0?P.card:P.muted}}>
                    {row.map((cell,ci)=>(
                      <td key={ci} style={{padding:'7px 12px',borderBottom:`1px solid ${P.bdr}`}}
                        dangerouslySetInnerHTML={{__html:cell}} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <div style={card({borderColor:col.bdr,background:col.tint})}>
          <div style={{fontWeight:700,fontSize:11,textTransform:'uppercase',letterSpacing:1,color:col.acc,marginBottom:8}}>Gebruik van de tabellen</div>
          <div style={{fontSize:13,lineHeight:1.7}} dangerouslySetInnerHTML={{__html:fd.usage}} />
        </div>
      </div>
    </div>
  );
}

// ── TEST ─────────────────────────────────────────────────────────────────────
if (screen==='test' && ts) {
  // ── Results ──
  if (ts.fb==='done') {
    const score = ts.res.filter(r=>r.correct).length;
    const txt = score===5?'🎉 Perfect!':score>=4?'👍 Heel goed!':score>=3?'😊 Goed gedaan!':'📚 Nog wat oefenen!';
    return (
      <div style={root}>
        <div style={hdr}>
          <button onClick={()=>goChap(chId)} style={btn(P.muted,P.txt,true)}>← {chId}</button>
          <span style={{fontWeight:700,fontSize:14,color:P.vio.acc}}>🧪 Resultaat</span>
        </div>
        <div style={body}>
          <div style={card({background:P.vio.tint,borderColor:P.vio.bdr,textAlign:'center',padding:24})}>
            <div style={{fontSize:42,marginBottom:6}}>{score>=4?'🎉':score>=3?'👍':'📚'}</div>
            <div style={{fontSize:36,fontWeight:800,color:P.vio.acc}}>{score}/5</div>
            <div style={{color:P.soft,marginTop:4,fontSize:14}}>{txt}</div>
          </div>

          <div style={{fontWeight:700,fontSize:11,textTransform:'uppercase',letterSpacing:1,color:P.soft,margin:'14px 0 8px'}}>Overzicht</div>
          {ts.res.map((r,i)=>(
            <div key={i} style={card({borderColor:r.correct?'#bbf7d0':'#fecaca',background:r.correct?P.ok.bg:P.err.bg,marginBottom:8})}>
              <div style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                <span style={{fontSize:16,flexShrink:0}}>{r.correct?'✅':'❌'}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:600,marginBottom:4,lineHeight:1.5}} dangerouslySetInnerHTML={{__html:r.q.q}} />
                  {!r.correct && <div style={{fontSize:12,color:P.err.txt,marginBottom:2}}>Jouw antwoord: <b dangerouslySetInnerHTML={{__html:r.q.o[r.sel]}} /></div>}
                  {!r.correct && <div style={{fontSize:12,color:P.ok.txt,marginBottom:2}}>Correct: <b dangerouslySetInnerHTML={{__html:r.q.o[r.q.c]}} /></div>}
                  {!r.correct && <div style={{fontSize:12,color:P.soft,fontStyle:'italic'}} dangerouslySetInnerHTML={{__html:r.q.e}} />}
                </div>
              </div>
            </div>
          ))}

          <div style={{display:'flex',gap:8,marginTop:12}}>
            <button onClick={()=>goTest(chId)} style={{...btn(P.vio.acc,P.card),flex:1}}>Opnieuw spelen</button>
            <button onClick={()=>goChap(chId)} style={{...btn(P.muted,P.txt),flex:1}}>← {chId}</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Active question ──
  const q = ts.qs[ts.cur];
  return (
    <div style={root}>
      <div style={hdr}>
        <button onClick={()=>goChap(chId)} style={btn(P.muted,P.txt,true)}>← {chId}</button>
        <span style={{fontWeight:700,fontSize:14,color:P.vio.acc}}>🧪 Test {chId}</span>
      </div>
      {/* Progress */}
      <div style={{height:4,background:P.muted,flexShrink:0}}>
        <div style={{height:'100%',background:P.vio.acc,width:`${(ts.res.length/5)*100}%`,transition:'width 0.3s'}} />
      </div>
      <div style={{padding:'3px 14px',background:P.card,fontSize:12,color:P.soft,flexShrink:0,borderBottom:`1px solid ${P.bdr}`}}>
        Vraag {ts.cur+1} van 5
      </div>
      <div style={body}>
        {ts.fb==='w1' && (
          <div style={{padding:'10px 14px',background:P.err.bg,border:'1px solid #fecaca',borderRadius:8,color:P.err.txt,marginBottom:10,fontWeight:600,fontSize:13}}>
            ✗ Fout! Probeer opnieuw.
          </div>
        )}
        {ts.fb==='w2' && (
          <div style={{padding:'10px 14px',background:P.err.bg,border:'1px solid #fecaca',borderRadius:8,marginBottom:10}}>
            <div style={{color:P.err.txt,fontWeight:600,fontSize:13,marginBottom:5}}>✗ Niet correct.</div>
            <div style={{fontSize:13}}>Correct: <b dangerouslySetInnerHTML={{__html:q.o[q.c]}} /></div>
            <div style={{fontSize:12,color:P.soft,marginTop:4,fontStyle:'italic'}} dangerouslySetInnerHTML={{__html:q.e}} />
          </div>
        )}
        {ts.fb==='ok' && (
          <div style={{padding:'10px 14px',background:P.ok.bg,border:'1px solid #bbf7d0',borderRadius:8,color:P.ok.txt,marginBottom:10,fontWeight:600,fontSize:13}}>
            ✓ Correct!
          </div>
        )}

        <div style={card()}>
          <div style={{fontSize:14,lineHeight:1.7,fontWeight:500}} dangerouslySetInnerHTML={{__html:q.q}} />
        </div>

        {q.o.map((opt,i)=>{
          const isSel = ts.sel===i;
          const isCorr = (ts.fb==='ok'||ts.fb==='w2') && i===q.c;
          const isWrong = ts.fb==='w2' && isSel && i!==q.c;
          let bg=P.card, bdr=P.bdr, c=P.txt;
          if (isCorr) { bg=P.ok.bg; bdr='#86efac'; c=P.ok.txt; }
          else if (isWrong) { bg=P.err.bg; bdr='#fca5a5'; c=P.err.txt; }
          else if (isSel) { bg=P.vio.tint; bdr=P.vio.acc; c=P.vio.acc; }
          return (
            <div key={i} onClick={()=>testSel(i)} style={{
              padding:'11px 14px',marginBottom:7,borderRadius:10,
              border:`2px solid ${bdr}`,background:bg,color:c,
              cursor:(ts.fb==='ok'||ts.fb==='w2')?'default':'pointer',
              display:'flex',alignItems:'center',gap:10,fontSize:13,lineHeight:1.5,
              minHeight:48,transition:'border-color 0.15s, background 0.15s',
            }}>
              <span style={{fontWeight:800,minWidth:18,color:c===P.txt?P.vio.acc:c}}>
                {['A','B','C','D'][i]}
              </span>
              <span dangerouslySetInnerHTML={{__html:opt}} />
            </div>
          );
        })}

        {(ts.fb===null||ts.fb==='w1') && (
          <button onClick={testCheck} disabled={ts.sel===null} style={{
            ...btn(ts.sel!==null?P.vio.acc:P.muted, ts.sel!==null?P.card:P.soft),
            width:'100%',marginTop:4,opacity:ts.sel===null?0.6:1,
          }}>Controleer</button>
        )}
        {(ts.fb==='ok'||ts.fb==='w2') && (
          <button onClick={testNext} style={{...btn(P.vio.acc,P.card),width:'100%',marginTop:4}}>
            {ts.cur===4?'Resultaat bekijken →':'Volgende vraag →'}
          </button>
        )}
      </div>
    </div>
  );
}

// ── COMPARE ───────────────────────────────────────────────────────────────────
if (screen==='compare') return (
  <div style={root}>
    <div style={hdr}>
      <button onClick={()=>goChap('H4')} style={btn(P.muted,P.txt,true)}>← H4</button>
      <span style={{fontWeight:700,fontSize:14,color:P.vio.acc}}>⚡ Galvanisch vs Elektrolytisch</span>
    </div>
    <div style={body}>
      <div style={{fontSize:13,color:P.soft,marginBottom:12,lineHeight:1.5}}>
        De twee typen elektrochemische cellen vergeleken. Let op de omgekeerde pooltekens!
      </div>
      <div style={card({padding:0,overflowX:'auto'})}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead>
            <tr>
              <th style={{padding:'9px 12px',textAlign:'left',borderBottom:`2px solid ${P.bdr}`,background:P.muted,fontSize:11,textTransform:'uppercase',letterSpacing:1,color:P.soft}}>Eigenschap</th>
              <th style={{padding:'9px 12px',textAlign:'left',borderBottom:`2px solid ${P.H4.bdr}`,background:P.H4.chip,color:P.H4.acc,fontSize:12,fontWeight:700}}>⚡ Galvanische cel</th>
              <th style={{padding:'9px 12px',textAlign:'left',borderBottom:`2px solid ${P.vio.bdr}`,background:P.vio.chip,color:P.vio.acc,fontSize:12,fontWeight:700}}>🔌 Elektrolytische cel</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((row,i)=>(
              <tr key={i} style={{background:i%2===0?P.card:P.muted}}>
                <td style={{padding:'9px 12px',fontWeight:600,borderBottom:`1px solid ${P.bdr}`,color:P.soft,fontSize:12}}>{row.r}</td>
                <td style={{padding:'9px 12px',borderBottom:`1px solid ${P.bdr}`,color:P.H4.acc,fontWeight:500}} dangerouslySetInnerHTML={{__html:row.g}} />
                <td style={{padding:'9px 12px',borderBottom:`1px solid ${P.bdr}`,color:P.vio.acc,fontWeight:500}} dangerouslySetInnerHTML={{__html:row.e}} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={card({borderColor:P.H4.bdr,background:P.H4.tint,marginTop:8})}>
        <div style={{fontWeight:700,fontSize:11,textTransform:'uppercase',letterSpacing:1,color:P.H4.acc,marginBottom:8}}>Geheugensteuntje</div>
        <div style={{fontSize:13,lineHeight:1.7}}>
          <b style={{color:P.H4.acc}}>Galvanisch:</b> de cel IS de stroombron. Anode = negatief (−), want oxidatie stuwt elektronen weg.<br/>
          <b style={{color:P.vio.acc}}>Elektrolyse:</b> de cel VERBRUIKT stroom. Externe bron keert de pooltekens om: anode = positief (+).
        </div>
      </div>
    </div>
  </div>
);

return null;
}
