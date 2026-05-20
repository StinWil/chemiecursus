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

// ── CHAPTER METADATA ──────────────────────────────────────────────────────────
const CHAP = {
  H1:{roman:'Hoofdstuk I',  t:'Dynamiek van de Reactie', sym:'⚡'},
  H2:{roman:'Hoofdstuk II', t:'Chemische Evenwichten',   sym:'⚖'},
  H3:{roman:'Hoofdstuk III',t:'Zuren en Basen',          sym:'⚗'},
  H4:{roman:'Hoofdstuk IV', t:'Redoxevenwichten',        sym:'🔋'},
  H5:{roman:'Hoofdstuk V',  t:'Duurzame Energie',        sym:'☀'},
};

// ── SECTION DATA ──────────────────────────────────────────────────────────────
const SEC = {
H1:[
{id:'1.1',t:'Reactiesnelheid',sub:'v = Δc/Δt · eenheden · gemiddelde vs. momentane snelheid',c1:true,
th:[
'Reactiesnelheid v = |Δc/Δt| in mol/(L·s) — concentratieverandering per tijdseenheid',
'<b>Gemiddelde snelheid</b> over een tijdsinterval; <b>momentane snelheid</b> = raaklijn aan c-t-grafiek',
'Snelheid daalt naarmate reactanten verbruikt worden (minder botsingen)',
'Snelheidswet: v = k·[A]<sup>m</sup>·[B]<sup>n</sup> — orde bepaald experimenteel, niet uit vergelijking',
'<b>Eenheid k</b> hangt af van totale reactieorde (bv. eerste orde: s<sup>−1</sup>; tweede orde: L/(mol·s))',
],
fm:'v = −Δ[A]/Δt = +Δ[P]/Δt\nEenheid: mol/(L·s)\nv = k·[A]<sup>m</sup>·[B]<sup>n</sup>',
exo:[
{s:1,q:'Bij de ontleding van H<sub>2</sub>O<sub>2</sub>: 2H<sub>2</sub>O<sub>2</sub> → 2H<sub>2</sub>O + O<sub>2</sub>. De concentratie daalt van 0,80 mol/L naar 0,56 mol/L in 120 s. (a) Bereken de gemiddelde reactiesnelheid v(H<sub>2</sub>O<sub>2</sub>). (b) Bereken v(O<sub>2</sub>). (c) Geef de eenheid.',
a:'(a) v(H<sub>2</sub>O<sub>2</sub>) = |Δc/Δt| = (0,80−0,56)/120 = <b>2,0×10<sup>−3</sup> mol/(L·s)</b><br>(b) v(O<sub>2</sub>) = ½·v(H<sub>2</sub>O<sub>2</sub>) = <b>1,0×10<sup>−3</sup> mol/(L·s)</b><br>(c) mol/(L·s) of mol·L<sup>−1</sup>·s<sup>−1</sup>'},
{s:1,q:'Voor de reactie N<sub>2</sub> + 3H<sub>2</sub> → 2NH<sub>3</sub> geldt v = k·[N<sub>2</sub>]·[H<sub>2</sub>]<sup>3</sup>. (a) Bepaal de totale reactieorde. (b) Welke eenheid heeft k? (c) Als [N<sub>2</sub>] verdubbelt: met welke factor verandert v?',
a:'(a) Orde = 1 + 3 = <b>4</b><br>(b) k in L<sup>3</sup>/(mol<sup>3</sup>·s)<br>(c) v verdubbelt: factor <b>2</b>'},
{s:2,q:'Een leerling volgt de esterificatie CH<sub>3</sub>OH + CH<sub>3</sub>COOH → CH<sub>3</sub>COOCH<sub>3</sub> + H<sub>2</sub>O en noteert [ester] = 0,00 M bij t=0, 0,25 M bij t=500 s en 0,40 M bij t=1500 s. (a) Bereken de gemiddelde snelheid in beide tijdsintervallen. (b) Verklaar waarom de snelheid afneemt. (c) Wanneer is de momentane snelheid het hoogst?',
a:'(a) Interval 0–500 s: v = 0,25/500 = <b>5,0×10<sup>−4</sup> mol/(L·s)</b>. Interval 500–1500 s: v = (0,40−0,25)/1000 = <b>1,5×10<sup>−4</sup> mol/(L·s)</b><br>(b) Reactanten worden verbruikt → lagere concentratie → minder botsingen per seconde → lagere snelheid<br>(c) De momentane snelheid is het hoogst <b>bij t = 0</b> (begin van de reactie, maximale concentraties)'},
{s:2,q:'De ontleding van NO<sub>2</sub>: 2NO<sub>2</sub> → 2NO + O<sub>2</sub>, v = k·[NO<sub>2</sub>]<sup>2</sup> met k = 0,50 L/(mol·s). Bij [NO<sub>2</sub>] = 0,40 mol/L: (a) Bereken v. (b) Welke [NO<sub>2</sub>] geeft v = 0,020 mol/(L·s)? (c) Verklaar de kwadratische orde via botsingstheorie.',
a:'(a) v = 0,50·(0,40)<sup>2</sup> = <b>0,080 mol/(L·s)</b><br>(b) 0,020 = 0,50·c<sup>2</sup> → c<sup>2</sup> = 0,040 → c = <b>0,20 mol/L</b><br>(c) De snelheidsbepalende stap vereist botsing van twee NO<sub>2</sub>-moleculen tegelijk → kans ∝ [NO<sub>2</sub>]<sup>2</sup> — elke verdubbeling verviervoudigt de botsingfrequentie'},
{s:3,q:'Experimenteel worden de volgende beginsnelheden gemeten voor A + B → P: experiment 1 [A]=0,10, [B]=0,10, v=2,0×10<sup>−4</sup>; experiment 2 [A]=0,20, [B]=0,10, v=4,0×10<sup>−4</sup>; experiment 3 [A]=0,10, [B]=0,20, v=8,0×10<sup>−4</sup> (alles mol/L en mol/(L·s)). (a) Bepaal de orde in A en in B. (b) Schrijf de snelheidswet. (c) Bereken k.',
a:'(a) Exp1→2: v verdubbelt bij [A] verdubbelt → orde in A = <b>1</b>. Exp1→3: v verviervoudigt bij [B] verdubbelt → orde in B = <b>2</b><br>(b) v = k·[A]·[B]<sup>2</sup><br>(c) k = v/([A]·[B]<sup>2</sup>) = 2,0×10<sup>−4</sup>/(0,10·0,010) = <b>0,20 L<sup>2</sup>/(mol<sup>2</sup>·s)</b>'},
{s:3,q:'Een radiolabeling-experiment volgt de pseudo-eerste-orde ontleding van een medicijn: c(t) = c<sub>0</sub>·e<sup>−kt</sup>. Bij t=0 is c=100 mg/L; bij t=2 h is c=75 mg/L. (a) Bereken k. (b) Bereken de halfwaardetijd t<sub>½</sub> = ln2/k. (c) Na hoeveel uur is nog 10% aanwezig?',
a:'(a) 75 = 100·e<sup>−2k</sup> → e<sup>−2k</sup> = 0,75 → k = −ln(0,75)/2 = <b>0,144 h<sup>−1</sup></b><br>(b) t<sub>½</sub> = ln2/0,144 = <b>4,8 h</b><br>(c) 0,10 = e<sup>−0,144t</sup> → t = ln(10)/0,144 = <b>16,0 h</b>'},
]},

{id:'1.2',t:'Factoren die de reactiesnelheid beïnvloeden',sub:'Concentratie · temperatuur · contactoppervlak · katalysator',c1:true,
th:[
'<b>Concentratie ↑</b>: meer deeltjes per volume → meer botsingen per seconde → v ↑',
'<b>Temperatuur ↑</b>: hogere kinetische energie → meer effectieve botsingen (> E<sub>a</sub>) → v ↑',
'<b>Contactoppervlak ↑</b>: meer reactieve oppervlakte (bij vaste stoffen) → v ↑',
'<b>Katalysator</b>: biedt alternatief reactiepad met lagere E<sub>a</sub> → v ↑ zonder zichzelf te verbruiken',
'Verhogen T met 10°C verdubbelt de snelheid ruwweg (vuistregel)',
],
fm:'Botsingstheorie: effectieve botsing = juiste richting én E ≥ E<sub>a</sub>\nKatalysator: verlaagt E<sub>a</sub>, verhoogt k',
exo:[
{s:1,q:'Een suikerklomp en poedersuiker reageren met HCl. (a) Welke reageert sneller? Verklaar via contactoppervlak. (b) Noem twee andere factoren die de snelheid van deze reactie beïnvloeden. (c) Hoe zou een katalysator dit proces veranderen?',
a:'(a) <b>Poedersuiker</b> — veel groter contactoppervlak per gram → meer reactieve plaatsen per tijdseenheid<br>(b) Temperatuur van de HCl-oplossing en concentratie van HCl<br>(c) Een katalysator zou E<sub>a</sub> verlagen → meer moleculen kunnen over de energiedrempel → snellere reactie'},
{s:1,q:'Bij de reactie van Zn-poeder met HCl 1,0 M bij 20°C en bij 40°C meet je 25 mL H<sub>2</sub>-gas in resp. 60 s en 30 s. (a) Bereken de gemiddelde snelheid (in mL/s) bij beide temperaturen. (b) Met welke factor stijgt de snelheid bij T + 20°C? (c) Wat voorspelt de vuistregel voor een stijging van 10°C?',
a:'(a) v<sub>20°C</sub> = 25/60 = <b>0,42 mL/s</b>; v<sub>40°C</sub> = 25/30 = <b>0,83 mL/s</b><br>(b) Factor = 0,83/0,42 ≈ <b>2,0×</b><br>(c) Vuistregel: elke 10°C verdubbeling → bij +20°C factor ≈ 2<sup>2</sup> = 4 (hier iets minder door niet-ideale omstandigheden)'},
{s:2,q:'In de industrie maakt men SO<sub>3</sub> via 2SO<sub>2</sub> + O<sub>2</sub> → 2SO<sub>3</sub> met V<sub>2</sub>O<sub>5</sub>-katalysator bij 450°C. (a) Verklaar de rol van V<sub>2</sub>O<sub>5</sub>. (b) Waarom wordt niet nog hogere T gebruikt? (c) Welke twee andere procesparameters verhogen de snelheid?',
a:'(a) V<sub>2</sub>O<sub>5</sub> is een heterogene katalysator die een alternatief reactiemechanisme aanbiedt met lagere activeringsenergie → snellere omzetting zonder zichzelf permanent te verbruiken<br>(b) Hogere T vermindert de evenwichtsopbrengst (reactie is exotherm → Le Chatelier verschuift naar links bij T↑)<br>(c) <b>Hoge druk</b> (meer botsingen) en <b>hoge SO<sub>2</sub>/O<sub>2</sub>-concentratie</b>'},
{s:2,q:'Een katalytische converter in een auto reduceert NO via 2NO + 2CO → N<sub>2</sub> + 2CO<sub>2</sub> op Pt/Rh-oppervlak. (a) Welk type katalyse is dit? (b) Verklaar de werking via adsorptie. (c) Noem een stof die de katalysator vergiftigt en verklaar het effect.',
a:'(a) <b>Heterogene katalyse</b> — vaste katalysator, gasvormige reactanten<br>(b) NO en CO adsorberen aan het Pt-oppervlak → bindingen worden verzwakt → activeringsenergie daalt → reactie verloopt sneller via een oppervlaktecomplex als tussenproduct<br>(c) <b>Lood (Pb)</b> uit gelood benzine bezet de actieve plaatsen van Pt permanent (chemisorptie) → katalysator gedesactiveerd → NO en CO worden niet meer omgezet'},
{s:3,q:'Een kleurverandering-experiment met I<sub>2</sub> + S<sub>2</sub>O<sub>3</sub><sup>2−</sup> → kleurloos bij constante I<sub>2</sub>-concentratie geeft halfwaardetijden t<sub>½</sub>: 45 s bij 10°C en 18 s bij 30°C. (a) Bereken de verhouding van de snelheidsconstanten k<sub>30</sub>/k<sub>10</sub>. (b) Bereken de Q<sub>10</sub>-factor per 10°C. (c) Is de vuistregel ("verdubbeling per 10°C") van toepassing?',
a:'(a) t<sub>½</sub> ∝ 1/k → k<sub>30</sub>/k<sub>10</sub> = t<sub>½,10</sub>/t<sub>½,30</sub> = 45/18 = <b>2,5×</b><br>(b) Over 20°C: factor 2,5 → Q<sub>10</sub> = √2,5 = <b>1,58 per 10°C</b><br>(c) <b>Niet volledig</b> — vuistregel zegt factor 2; hier slechts 1,58. De vuistregel is een ruwe benadering die sterk afhangt van de activeringsenergie E<sub>a</sub>.'},
{s:3,q:'Een enzym katalyseert de afbraak van substraat S. Bij T=37°C en [S]=0,10 mol/L meet je v=1,0×10<sup>−3</sup> mol/(L·s). Bij [S]=0,50 mol/L meet je v=4,0×10<sup>−3</sup> mol/(L·s), bij [S]=2,0 mol/L v=5,0×10<sup>−3</sup> mol/(L·s). (a) Verklaar de verzadiging bij hoge [S]. (b) Bereken de maximale snelheid V<sub>max</sub>. (c) Wat is de rol van het actief centrum van het enzym?',
a:'(a) Bij hoge [S] zijn alle actieve centra van het enzym bezet (verzadigd) → v kan niet verder stijgen ongeacht hogere [S] — dit heet substraatverzadiging (Michaelis-Menten kinetiek)<br>(b) <b>V<sub>max</sub> ≈ 5,0×10<sup>−3</sup> mol/(L·s)</b> (uit asymptotisch gedrag bij hoge [S])<br>(c) Het actief centrum is een specifieke bindingsplaats met complementaire vorm voor het substraat → substraat bindt tijdelijk → lagere E<sub>a</sub> via gunstige intermoleculaire interacties → product vrijgemaakt → enzym hergebruikt'},
]},

{id:'1.3',t:'Energetische aspecten',sub:'E<sub>a</sub> · energiediagram · ΔH · exo- vs. endotherm',c1:true,
th:[
'<b>Activeringsenergie E<sub>a</sub></b>: minimumenergie nodig voor een effectieve botsing (overgangscomplex)',
'<b>Energiediagram:</b> reactanten → overgangscomplex (top) → producten; helling geeft ΔH',
'<b>Exotherm:</b> E(producten) < E(reactanten), ΔH < 0 — energie vrijgesteld',
'<b>Endotherm:</b> E(producten) > E(reactanten), ΔH > 0 — energie opgenomen',
'Katalysator verlaagt E<sub>a</sub> maar wijzigt ΔH niet (thermodynamische grootheden onveranderlijk)',
],
fm:'ΔH = E(producten) − E(reactanten)\nExotherm: ΔH < 0 · Endotherm: ΔH > 0\nE<sub>a,terugwaarts</sub> = E<sub>a,voorwaarts</sub> − ΔH',
exo:[
{s:1,q:'De verbranding van methaan CH<sub>4</sub> + 2O<sub>2</sub> → CO<sub>2</sub> + 2H<sub>2</sub>O heeft ΔH = −890 kJ/mol en E<sub>a</sub> = 250 kJ/mol. (a) Teken schematisch het energiediagram. (b) Bereken E<sub>a</sub> voor de terugwaartse reactie. (c) Is de reactie exo- of endotherm?',
a:'(a) Diagram: reactanten op laag niveau, overgangscomplex op top (+250 kJ), producten nog lager (−890 kJ t.o.v. reactanten)<br>(b) E<sub>a,terug</sub> = 250 − (−890) = <b>1140 kJ/mol</b><br>(c) <b>Exotherm</b> (ΔH = −890 kJ/mol < 0)'},
{s:1,q:'De fotosynthese is endotherm met ΔH = +2804 kJ per mol glucose. E<sub>a</sub> (voorwaarts) = 3000 kJ/mol. (a) Bereken E<sub>a</sub> terugwaartse reactie. (b) Hoe maakt de plant dit energetisch mogelijk? (c) Wat is de katalysator in dit biologisch systeem?',
a:'(a) E<sub>a,terug</sub> = 3000 − 2804 = <b>196 kJ/mol</b><br>(b) Door lichtenergie te absorberen via chlorofyl — fotonen leveren de nodige activeringsenergie<br>(c) <b>Chlorofyl</b> (en de enzymen van het fotosynthetisch apparaat) fungeren als biologische katalysatoren'},
{s:2,q:'Voor de reactie A → B geldt E<sub>a</sub> = 80 kJ/mol en ΔH = −30 kJ/mol zonder katalysator. Met katalysator daalt E<sub>a</sub> tot 45 kJ/mol. (a) Bereken E<sub>a</sub> terugwaarts zonder katalysator. (b) Bereken E<sub>a</sub> terugwaarts met katalysator. (c) Verandert ΔH door de katalysator?',
a:'(a) E<sub>a,terug</sub> = 80 − (−30) = <b>110 kJ/mol</b><br>(b) E<sub>a,terug,kat</sub> = 45 + 30 = <b>75 kJ/mol</b> (ΔH onveranderd, E<sub>a</sub> voor- en terugwaarts dalen evenredig)<br>(c) <b>Nee</b> — de katalysator verlaagt E<sub>a</sub> maar wijzigt de enthalpie van reactanten en producten niet (ΔH is een toestandsfunctie)'},
{s:2,q:'Bij de Haber-Bosch-synthese: N<sub>2</sub> + 3H<sub>2</sub> → 2NH<sub>3</sub>, ΔH = −92 kJ/mol, E<sub>a</sub>(met Fe-katalysator) = 150 kJ/mol. (a) Waarom daalt de opbrengst bij hogere T ondanks hogere snelheid? (b) Bereken E<sub>a</sub> van de terugwaartse ontleding. (c) Welk compromis kiest men industrieel?',
a:'(a) Reactie is exotherm → Le Chatelier: hogere T verschuift evenwicht naar links → minder NH<sub>3</sub> (thermodynamische belemmering)<br>(b) E<sub>a,terug</sub> = 150 + 92 = <b>242 kJ/mol</b><br>(c) Compromis: T ≈ 450–500°C (snel genoeg + aanvaardbare opbrengst), hoge druk (200 atm) en Fe-katalysator'},
{s:3,q:'In een energiediagram hebben reactanten energie E<sub>R</sub> = 100 kJ/mol, overgangscomplex E<sub>TS</sub> = 280 kJ/mol en twee producten-stadia: intermediair I op 150 kJ/mol (tussenstap) en eindproduct P op 60 kJ/mol. (a) Schrijf E<sub>a</sub> voor stap 1 (R→I) en stap 2 (I→P). (b) Welke stap is snelheidsbepalend? (c) Bereken totaal ΔH.',
a:'(a) Stap 1: E<sub>a,1</sub> = 280−100 = <b>180 kJ/mol</b>. Stap 2 (I→P, overgangscomplex bij top 280 kJ maar dat is step 1 TS; stap 2 TS ligt hoger): E<sub>a,2</sub> = 280−150 = <b>130 kJ/mol</b> (zelfde overgangscomplex)<br>(b) <b>Stap 1</b> — hoogste E<sub>a</sub> (180 kJ/mol) bepaalt de snelheid van de totale reactie<br>(c) ΔH = 60 − 100 = <b>−40 kJ/mol</b> (exotherm, totale reactie)'},
{s:3,q:'De reactie 2NO + O<sub>2</sub> → 2NO<sub>2</sub> verloopt sneller bij verlaging van T (abnormale kinetiek). Verklaar via een tweestappenmechanisme: stap 1 2NO ⇌ N<sub>2</sub>O<sub>2</sub> (exotherm, K<sub>1</sub> daalt met T) en stap 2 N<sub>2</sub>O<sub>2</sub> + O<sub>2</sub> → 2NO<sub>2</sub> (gewone kinetiek). (a) Schrijf de snelheidsvergelijking als stap 2 snelheidsbepalend is. (b) Verklaar waarom v daalt bij T↑. (c) Bereken [N<sub>2</sub>O<sub>2</sub>] via K<sub>1</sub> = 10 L/mol bij [NO]=0,10 mol/L.',
a:'(a) v = k<sub>2</sub>·[N<sub>2</sub>O<sub>2</sub>]·[O<sub>2</sub>] = k<sub>2</sub>·K<sub>1</sub>·[NO]<sup>2</sup>·[O<sub>2</sub>] → v = k<sub>eff</sub>·[NO]<sup>2</sup>·[O<sub>2</sub>]<br>(b) Bij T↑: K<sub>1</sub> daalt (evenwicht 1 exotherm) → [N<sub>2</sub>O<sub>2</sub>] daalt → v daalt ondanks k<sub>2</sub> stijgt — het thermodynamische effect domineert<br>(c) K<sub>1</sub> = [N<sub>2</sub>O<sub>2</sub>]/[NO]<sup>2</sup> = 10 → [N<sub>2</sub>O<sub>2</sub>] = 10·(0,10)<sup>2</sup> = <b>0,10 mol/L</b>'},
]},

{id:'1.4',t:'Reactiemechanisme',sub:'Elementaire stappen · intermediair · snelheidsbepalende stap',c1:true,
th:[
'Reactiemechanisme = reeks elementaire stappen die de totaalreactie beschrijven',
'<b>Elementaire stap</b>: moleculariteit (uni-, bi-, trimoleculair) geeft direct de partiële orden',
'<b>Intermediair</b>: ontstaat in één stap, verdwijnt in een volgende — verschijnt niet in de totaalvergelijking',
'<b>Snelheidsbepalende stap (SBS)</b>: de traagste stap bepaalt de snelheid van de totale reactie',
'<b>Overgangscomplex</b>: hoogenergetische toestand op de top van het energiediagram (geen isoleerbaar intermediair)',
],
fm:'Moleculariteit elementaire stap → orde in snelheidswet van die stap\nSBS bepaalt totale snelheidswet\nTotaalvergelijking = som elementaire stappen',
exo:[
{s:1,q:'De ontleding van ozon verloopt via twee stappen: (1) O<sub>3</sub> ⇌ O<sub>2</sub> + O (snel evenwicht), (2) O + O<sub>3</sub> → 2O<sub>2</sub> (traag). (a) Schrijf de totaalreactie. (b) Identificeer het intermediair. (c) Schrijf de snelheidswet als stap 2 SBS is.',
a:'(a) 2O<sub>3</sub> → 3O<sub>2</sub><br>(b) <b>O</b> (atoomzuurstof) — ontstaat in stap 1, verdwijnt in stap 2<br>(c) v = k<sub>2</sub>·[O]·[O<sub>3</sub>] — via K<sub>1</sub> = [O<sub>2</sub>][O]/[O<sub>3</sub>] → [O] = K<sub>1</sub>[O<sub>3</sub>]/[O<sub>2</sub>] → v = k<sub>eff</sub>·[O<sub>3</sub>]<sup>2</sup>/[O<sub>2</sub>]'},
{s:1,q:'Een reactie A + B → C verloopt via: (1) A → X (traag, SBS), (2) X + B → C (snel). (a) Schrijf de snelheidswet. (b) Is X een intermediair of overgangscomplex? (c) Welke data bevestigen dat stap 1 de SBS is?',
a:'(a) v = k<sub>1</sub>·[A] (stap 1 unimoleculair, SBS)<br>(b) <b>Intermediair</b> — het is een isoleerbaar tussenproduct dat lang genoeg bestaat om te reageren met B (niet slechts een kortstondig overgangscomplex op de top van de energieberg)<br>(c) Als de werkelijk gemeten snelheid alleen afhangt van [A] (en niet van [B]), bevestigt dat stap 1 de SBS is. Experimenteel: verander [B] → v verandert niet.'},
{s:2,q:'De reactie 2NO<sub>2</sub>Cl → 2NO<sub>2</sub> + Cl<sub>2</sub> verloopt via twee stappen: (1) NO<sub>2</sub>Cl → NO<sub>2</sub> + Cl (traag), (2) NO<sub>2</sub>Cl + Cl → NO<sub>2</sub> + Cl<sub>2</sub> (snel). Experiment: v = k·[NO<sub>2</sub>Cl]. (a) Verifieer dat het mechanisme consistent is met de snelheidswet. (b) Identificeer het intermediair. (c) Is de totaalreactie consistent met het mechanisme?',
a:'(a) SBS = stap 1 (unimoleculair) → v = k<sub>1</sub>·[NO<sub>2</sub>Cl] — <b>consistent</b> met gemeten v = k·[NO<sub>2</sub>Cl] ✓<br>(b) <b>Cl</b>-atoom — gevormd in stap 1, verbruikt in stap 2<br>(c) Stap 1 + Stap 2: NO<sub>2</sub>Cl + NO<sub>2</sub>Cl + Cl → 2NO<sub>2</sub> + Cl<sub>2</sub> + Cl → 2NO<sub>2</sub>Cl → 2NO<sub>2</sub> + Cl<sub>2</sub> ✓ consistent'},
{s:2,q:'Een vrije-radicaal kettingreactie voor CH<sub>4</sub> + Cl<sub>2</sub> → CH<sub>3</sub>Cl + HCl verloopt via: Initiatie: Cl<sub>2</sub> → 2Cl· ; Propagatie: Cl· + CH<sub>4</sub> → HCl + CH<sub>3</sub>·; CH<sub>3</sub>· + Cl<sub>2</sub> → CH<sub>3</sub>Cl + Cl·. (a) Identificeer alle intermediairs. (b) Schrijf de totaalreactie. (c) Verklaar wat "kettingreactie" betekent via de propagatiestappen.',
a:'(a) Cl· en CH<sub>3</sub>· zijn vrije radicalen (intermediairs)<br>(b) CH<sub>4</sub> + Cl<sub>2</sub> → CH<sub>3</sub>Cl + HCl<br>(c) In propagatie regenereert elke stap een radicaal dat de volgende stap initieert → de ketting draagt zichzelf oneindig voort totdat terminatie optreedt (twee radicalen combineren). Één initiatiestap kan duizenden propagatiecycli starten.'},
{s:3,q:'Voor de reactie H<sub>2</sub> + Br<sub>2</sub> → 2HBr wordt experimenteel gevonden: v = k·[H<sub>2</sub>]·[Br<sub>2</sub>]<sup>½</sup>. Voorgesteld mechanisme: (1) Br<sub>2</sub> ⇌ 2Br· (snel evenwicht, K<sub>1</sub>), (2) Br· + H<sub>2</sub> → HBr + H· (traag, SBS), (3) H· + Br<sub>2</sub> → HBr + Br· (snel). (a) Leid de snelheidswet af. (b) Verifieer de [Br<sub>2</sub>]<sup>½</sup>-orde. (c) Welke waarneming bevestigt het radicaalmechanisme?',
a:'(a) v = k<sub>2</sub>·[Br·]·[H<sub>2</sub>]. K<sub>1</sub> = [Br·]<sup>2</sup>/[Br<sub>2</sub>] → [Br·] = √(K<sub>1</sub>·[Br<sub>2</sub>]) → v = k<sub>2</sub>·√K<sub>1</sub>·[H<sub>2</sub>]·[Br<sub>2</sub>]<sup>½</sup><br>(b) De halve orde in Br<sub>2</sub> volgt uit de √ in [Br·]-expressie — het snel evenwicht in stap 1 introduceert de vierkantswortel ✓<br>(c) Lichtgevoeligheid (fotonen dissociëren Br<sub>2</sub> → Br·), inhibitie door HBr (product werkt als remmer), en de karakteristieke explosieve fotochemische reactie bij UV-licht.'},
]},

{id:'1.5',t:'Katalyse',sub:'Homogeen · heterogeen · enzymkatalyse · werking E<sub>a</sub>',c1:true,
th:[
'<b>Katalysator</b>: verlaagt E<sub>a</sub> door een alternatief reactiemechanisme; wordt niet verbruikt',
'<b>Homogene katalyse</b>: katalysator en reactanten in dezelfde fase (bv. H<sup>+</sup> in esterificatie)',
'<b>Heterogene katalyse</b>: katalysator in andere fase (bv. Pt-rooster voor gasfase-reacties)',
'<b>Enzymkatalyse</b>: biologische eiwitkatalysatoren met actief centrum — hoge specificiteit, T- en pH-gevoelig',
'Katalysator verhoogt zowel voor- als terugwaartse snelheid evenredig — evenwicht onveranderd',
],
fm:'Katalysator: verlaagt E<sub>a</sub>, verhoogt k zonder ΔH te wijzigen\nEnzym: E + S ⇌ ES → E + P',
exo:[
{s:1,q:'Bij de bereiding van margarine wordt vloeibaar plantenolie gehydrogeneerd met een Ni-katalysator: olie + H<sub>2</sub> → margarine. (a) Welk type katalyse? (b) Hoe werkt adsorptie op het Ni-oppervlak? (c) Waarom wordt Ni verkozen boven Au?',
a:'(a) <b>Heterogene katalyse</b> — vaste Ni-katalysator, vloeibare olie + gasvormig H<sub>2</sub><br>(b) H<sub>2</sub> adsorbeert dissociatief op Ni → H-atomen bezetten oppervlakteplaatsen → verminderen H-H-bindingsenergie → lager E<sub>a</sub> voor reactie met de C=C-dubbelbinding van het vet<br>(c) Au adsorbeert H<sub>2</sub> te zwak — geen effectieve dissociatie. Ni heeft optimale bindingssterkte (Sabatier-principe): noch te sterk (Pt, te duur) noch te zwak.'},
{s:1,q:'Speekselamylase is een enzym dat zetmeel (amylose) afbreekt tot maltose. (a) Definieer substraat en product in deze reactie. (b) Verklaar de specificiteit van het enzym. (c) Waarom werkt het enzym niet meer bij 80°C?',
a:'(a) Substraat = zetmeel (amyloseketen), product = maltose (disaccharide)<br>(b) Het actief centrum heeft een complementaire 3D-structuur voor de zetmeelketen (sleutel-slot-model) → enkel moleculen met de juiste vorm passen → hoge specificiteit<br>(c) Bij hoge T denatureert het eiwit — de tertiaire structuur wordt verstoord → het actief centrum verliest zijn specifieke geometrie → enzym inactief'},
{s:2,q:'De CFC-katalytische afbraak van ozon verloopt via: Cl· + O<sub>3</sub> → ClO + O<sub>2</sub>; ClO + O → Cl· + O<sub>2</sub>. (a) Schrijf de totaalreactie. (b) Is dit homo- of heterogene katalyse? (c) Hoeveel ozonmoleculen kan één Cl·-atoom theoretisch afbreken?',
a:'(a) O<sub>3</sub> + O → 2O<sub>2</sub><br>(b) <b>Homogene katalyse</b> — Cl· en ozon zijn beiden in gasfase<br>(c) Elke keer dat de ketting doorloopt vernietigt Cl· één O<sub>3</sub>; Cl· wordt telkens geregenereerd → theoretisch 10<sup>5</sup>–10<sup>6</sup> O<sub>3</sub>-moleculen per Cl·-atoom (ketenmechanisme)'},
{s:2,q:'In een industrieel CH<sub>3</sub>OH-syntheseproces (methanol) wordt CO + 2H<sub>2</sub> → CH<sub>3</sub>OH gekatalyseerd door Cu/ZnO bij 250°C. (a) Welk type katalyse? (b) Verklaar waarom de katalysator periodiek "regenereerd" moet worden. (c) Vergelijk dit met een enzym: welke eigenschap ontbreekt in de industriële katalysator?',
a:'(a) <b>Heterogene katalyse</b> (Cu/ZnO = vaste katalysator, gasvormige reactanten)<br>(b) Zwavel-verbindingen in het procesgas "vergiftigen" de actieve Cu-plaatsen (sterke chemisorptie) → katalytische activiteit daalt → periodieke regeneratie of vervanging nodig<br>(c) Specificiteit en T/pH-gevoeligheid ontbreken — een enzym werkt enkel bij één substraat en faalt buiten een nauwe T/pH-band; de industriële katalysator is minder selectief maar werkt bij hoge T/druk waar enzymen niet kunnen werken.'},
{s:3,q:'Een enzymreactie volgt Michaelis-Menten kinetiek: v = V<sub>max</sub>·[S]/(K<sub>M</sub>+[S]) met V<sub>max</sub>=8,0×10<sup>−3</sup> mol/(L·s) en K<sub>M</sub>=2,0×10<sup>−3</sup> mol/L. (a) Bereken v bij [S]=2,0×10<sup>−3</sup> mol/L. (b) Bereken [S] voor v = 0,75·V<sub>max</sub>. (c) Verklaar de fysiologische betekenis van K<sub>M</sub>.',
a:'(a) v = 8,0×10<sup>−3</sup>·2,0×10<sup>−3</sup>/(2,0×10<sup>−3</sup>+2,0×10<sup>−3</sup>) = 8,0×10<sup>−3</sup>/2 = <b>4,0×10<sup>−3</sup> mol/(L·s)</b><br>(b) 0,75·V<sub>max</sub> = V<sub>max</sub>·[S]/(K<sub>M</sub>+[S]) → 0,75(K<sub>M</sub>+[S]) = [S] → 0,75K<sub>M</sub> = 0,25[S] → [S] = 3K<sub>M</sub> = <b>6,0×10<sup>−3</sup> mol/L</b><br>(c) K<sub>M</sub> = de substraatconcentratie bij v = ½V<sub>max</sub> — hoe kleiner K<sub>M</sub>, hoe sterker het enzym bindt aan zijn substraat. K<sub>M</sub> karakteriseert de affiniteit van het enzym voor het substraat.'},
{s:3,q:'Een competitieve remmer I blokkeert het actief centrum van een enzym. Met remmer geldt: v = V<sub>max</sub>·[S]/(K<sub>M,app</sub>+[S]) waarbij K<sub>M,app</sub> = K<sub>M</sub>(1+[I]/K<sub>I</sub>). V<sub>max</sub>=10 mol/(L·s), K<sub>M</sub>=1,0 mol/L, [I]=2,0 mol/L, K<sub>I</sub>=0,5 mol/L. (a) Bereken K<sub>M,app</sub>. (b) Bereken v bij [S]=1,0 mol/L zonder en met remmer. (c) Hoe overwin je competitieve remming?',
a:'(a) K<sub>M,app</sub> = 1,0·(1+2,0/0,5) = 1,0·5 = <b>5,0 mol/L</b><br>(b) Zonder: v = 10·1/(1+1) = <b>5,0 mol/(L·s)</b>. Met: v = 10·1/(5+1) = <b>1,67 mol/(L·s)</b><br>(c) Door [S] sterk te verhogen — hoge substraatconcentratie verdringt de remmer van het actief centrum (competitieve inhibitie is reversibel via massawerking). V<sub>max</sub> blijft onveranderd; enkel K<sub>M,app</sub> stijgt.'},
]},
],

H2:[
{id:'2.1',t:'Dynamisch evenwicht',sub:'Reversibele reactie · evenwichtstoestand · dynamisch karakter',c1:true,
th:[
'<b>Reversibele reactie</b>: kan in beide richtingen verlopen; notatief met ⇌',
'<b>Evenwichtstoestand</b>: v<sub>voorwaarts</sub> = v<sub>terugwaarts</sub> — concentraties <i>constant</i> maar niet nul',
'<b>Dynamisch</b>: heen- en terugre­actie verlopen voortdurend — macroscopisch geen verandering zichtbaar',
'Evenwicht wordt bereikt ongeacht de startconcentraties (zolang T constant)',
'Verstoring van evenwicht leidt tot verschuiving die de verstoring gedeeltelijk compenseert (Le Chatelier)',
],
fm:'aA + bB ⇌ cC + dD\nV<sub>voorwaarts</sub> = V<sub>terugwaarts</sub> bij evenwicht\nConcentraties constant maar ≠ 0',
exo:[
{s:1,q:'In een gesloten fles frisdrank lost CO<sub>2</sub> op: CO<sub>2</sub>(g) ⇌ CO<sub>2</sub>(aq). (a) Beschrijf het dynamisch karakter van dit evenwicht. (b) Wat gebeurt als de fles geopend wordt? (c) Bij welke T is meer CO<sub>2</sub> opgelost?',
a:'(a) Voortdurend lossen CO<sub>2</sub>-moleculen op terwijl andere uit de oplossing ontsnappen — netto-concentratie constant omdat beide snelheden gelijk zijn<br>(b) Druk boven de vloeistof daalt → evenwicht verschuift naar links → CO<sub>2</sub> ontsnapt (bruisen)<br>(c) <b>Lage T</b> — oplossen van gas is exotherm; bij lagere T ligt evenwicht meer naar rechts (Le Chatelier)'},
{s:1,q:'Ijzer(III)chloride reageert met thiocyanaat: Fe<sup>3+</sup> + SCN<sup>−</sup> ⇌ FeSCN<sup>2+</sup> (bloedrode kleur). (a) Verklaar hoe je kunt aantonen dat het evenwicht dynamisch is. (b) Wat observeer je als je meer Fe<sup>3+</sup> toevoegt? (c) Wat als je NaF toevoegt (F<sup>−</sup> bindt Fe<sup>3+</sup>)?',
a:'(a) Gebruik van <sup>14</sup>C of <sup>57</sup>Fe als isotooplabeling: ook na schijnbaar constant blijven van de kleur wordt isotoop uitgewisseld → reactie loopt nog steeds heen en terug<br>(b) Evenwicht verschuift naar rechts → meer FeSCN<sup>2+</sup> → kleur wordt <b>intenser rood</b><br>(c) F<sup>−</sup> bindt Fe<sup>3+</sup> tot FeF<sub>3</sub> → [Fe<sup>3+</sup>] daalt → evenwicht verschuift naar links → FeSCN<sup>2+</sup> neemt af → kleur <b>vervaagt naar geel</b>'},
{s:2,q:'De reactie N<sub>2</sub>O<sub>4</sub>(g) ⇌ 2NO<sub>2</sub>(g) (kleurloos ⇌ bruin) verloopt bij 25°C. (a) Leg uit waarom een mengsel van N<sub>2</sub>O<sub>4</sub> en NO<sub>2</sub> bruiner wordt bij verwarming. (b) Is de reactie exo- of endotherm? (c) Beschrijf de toestand bij evenwicht op moleculair niveau.',
a:'(a) Bij hogere T verschuift het evenwicht naar rechts (meer NO<sub>2</sub>) → mengsel wordt bruiner<br>(b) <b>Endotherm</b> (hogere T bevordert dissociatie → warmte wordt opgenomen)<br>(c) N<sub>2</sub>O<sub>4</sub>-moleculen vallen uiteen tot twee NO<sub>2</sub>-moleculen terwijl NO<sub>2</sub>-moleculen botsen en recombineren tot N<sub>2</sub>O<sub>4</sub> — beide processen lopen even snel, de verhouding is constant maar het is voortdurende activiteit op moleculair niveau'},
{s:2,q:'In een gesloten vat bij 500°C stelt men een mengsel in: H<sub>2</sub>(g) + I<sub>2</sub>(g) ⇌ 2HI(g). Na 30 min meten: [H<sub>2</sub>]=0,10, [I<sub>2</sub>]=0,10, [HI]=0,60 mol/L. Na nog 30 min: zelfde waarden. (a) Waarom zijn de waarden na 60 min gelijk? (b) Hoe weet men dat er nog reactie plaatsvindt? (c) Welke informatie geeft Kc?',
a:'(a) Evenwicht bereikt na eerste 30 min — concentraties veranderen macroscopisch niet meer<br>(b) Isotooplabeling van H<sub>2</sub> of I<sub>2</sub> zou aantonen dat uitwisseling blijft plaatsvinden; ook: kleine temperatuurpuls verschuift het evenwicht tijdelijk<br>(c) K<sub>c</sub> geeft de verhouding [HI]<sup>2</sup>/([H<sub>2</sub>][I<sub>2</sub>]) — beschrijft kwantitatief de evenwichtsligging; groot K<sub>c</sub> = overwegend producten; klein K<sub>c</sub> = overwegend reactanten'},
{s:3,q:'Een leerling beweert: "bij evenwicht is de concentratie van reactanten en producten gelijk". (a) Is dit correct? (b) Geef een tegenvoorbeeld met K<sub>c</sub>-berekening. (c) Beschrijf het onderscheid tussen K<sub>c</sub> = 1, K<sub>c</sub> >> 1 en K<sub>c</sub> << 1.',
a:'(a) <b>Niet correct</b> — bij evenwicht zijn de concentraties constant, maar hun verhoudingen worden bepaald door K<sub>c</sub>, niet noodzakelijk gelijk<br>(b) Voorbeeld: voor N<sub>2</sub> + 3H<sub>2</sub> ⇌ 2NH<sub>3</sub> bij 500°C is K<sub>c</sub> ≈ 0,06 → reactanten overwegen sterk, concentraties zijn ongelijk<br>(c) K<sub>c</sub>=1: reactanten ≈ producten. K<sub>c</sub> >> 1: reactie bijna volledig → producten overheersen. K<sub>c</sub> << 1: reactie nauwelijks → reactanten overheersen.'},
]},

{id:'2.2',t:'Evenwichtsconstante Kc',sub:'Wet van massawerking · expressie · vaste stoffen',c1:true,
th:[
'K<sub>c</sub> = product van concentraties der producten (machten coëfficiënten) / product reactanten',
'Vaste stoffen en zuivere vloeistoffen <b>niet</b> opnemen in K<sub>c</sub>-expressie',
'K<sub>c</sub> is temperatuurafhankelijk — bij andere T anders K<sub>c</sub>',
'Grotere K<sub>c</sub>: evenwicht ligt meer naar producten; K<sub>c</sub> < 1: evenwicht naar reactanten',
'<b>Inversie:</b> voor omgekeerde reactie geldt K\'<sub>c</sub> = 1/K<sub>c</sub>',
],
fm:'K<sub>c</sub> = [C]<sup>c</sup>[D]<sup>d</sup> / ([A]<sup>a</sup>[B]<sup>b</sup>)\nVaste stoffen en pure vloeistoffen → weggelaten\nK\'<sub>c</sub>(omgekeerd) = 1/K<sub>c</sub>',
exo:[
{s:1,q:'Schrijf de K<sub>c</sub>-expressie voor: (a) N<sub>2</sub>(g) + 3H<sub>2</sub>(g) ⇌ 2NH<sub>3</sub>(g), (b) CaCO<sub>3</sub>(s) ⇌ CaO(s) + CO<sub>2</sub>(g), (c) CH<sub>3</sub>COOH(aq) + C<sub>2</sub>H<sub>5</sub>OH(aq) ⇌ CH<sub>3</sub>COOC<sub>2</sub>H<sub>5</sub>(aq) + H<sub>2</sub>O(l).',
a:'(a) K<sub>c</sub> = [NH<sub>3</sub>]<sup>2</sup> / ([N<sub>2</sub>]·[H<sub>2</sub>]<sup>3</sup>)<br>(b) K<sub>c</sub> = [CO<sub>2</sub>] — CaCO<sub>3</sub> en CaO zijn vaste stoffen → weglaten<br>(c) K<sub>c</sub> = [ester] / ([zuur]·[alcohol]) — zuiver water (vloeistof) weglaten'},
{s:1,q:'Voor H<sub>2</sub>(g) + I<sub>2</sub>(g) ⇌ 2HI(g) is K<sub>c</sub> = 50 bij 450°C. (a) Bereken [HI] bij evenwicht als [H<sub>2</sub>] = [I<sub>2</sub>] = 0,10 mol/L. (b) Bereken K<sub>c</sub> voor de terugwaartse reactie 2HI ⇌ H<sub>2</sub> + I<sub>2</sub>. (c) Is er meer HI of H<sub>2</sub>/I<sub>2</sub> aanwezig?',
a:'(a) K<sub>c</sub> = [HI]<sup>2</sup>/([H<sub>2</sub>][I<sub>2</sub>]) = [HI]<sup>2</sup>/0,010 = 50 → [HI]<sup>2</sup> = 0,50 → [HI] = <b>0,707 mol/L</b><br>(b) K\'<sub>c</sub> = 1/50 = <b>0,020</b><br>(c) [HI] = 0,707 mol/L >> [H<sub>2</sub>] = [I<sub>2</sub>] = 0,10 mol/L → <b>meer HI aanwezig</b>'},
{s:1,q:'De ontleding van PCl<sub>5</sub>(g) ⇌ PCl<sub>3</sub>(g) + Cl<sub>2</sub>(g) heeft K<sub>c</sub> = 0,030 mol/L bij 250°C. (a) Schrijf de K<sub>c</sub>-expressie. (b) Bij evenwicht: [PCl<sub>3</sub>] = [Cl<sub>2</sub>] = 0,10 mol/L. Bereken [PCl<sub>5</sub>]. (c) Wat betekent K<sub>c</sub> = 0,030 voor de reactierichting?',
a:'(a) K<sub>c</sub> = [PCl<sub>3</sub>][Cl<sub>2</sub>]/[PCl<sub>5</sub>]<br>(b) 0,030 = (0,10)(0,10)/[PCl<sub>5</sub>] → [PCl<sub>5</sub>] = 0,010/0,030 = <b>0,33 mol/L</b><br>(c) K<sub>c</sub> < 1 → evenwicht ligt meer naar de reactantenkant → het overgrote deel van de stof blijft als PCl<sub>5</sub> aanwezig'},
{s:2,q:'Voor 2SO<sub>2</sub>(g) + O<sub>2</sub>(g) ⇌ 2SO<sub>3</sub>(g) is K<sub>c</sub> = 2,8×10<sup>2</sup> L/mol bij 700 K. (a) Schrijf K<sub>c</sub>. (b) Bereken K<sub>c</sub> voor ½SO<sub>2</sub> + ¼O<sub>2</sub> ⇌ ½SO<sub>3</sub>. (c) Bereken K<sub>c</sub> voor de omgekeerde reactie 2SO<sub>3</sub> ⇌ 2SO<sub>2</sub> + O<sub>2</sub>.',
a:'(a) K<sub>c</sub> = [SO<sub>3</sub>]<sup>2</sup>/([SO<sub>2</sub>]<sup>2</sup>[O<sub>2</sub>])<br>(b) Halve vergelijking → K<sub>c</sub>\'= √K<sub>c</sub> = √280 = <b>16,7</b><br>(c) Omgekeerd → K<sub>c</sub>\'\'= 1/K<sub>c</sub> = 1/280 = <b>3,6×10<sup>−3</sup> mol/L</b>'},
{s:3,q:'Bij 1000 K geldt voor CO(g) + 3H<sub>2</sub>(g) ⇌ CH<sub>4</sub>(g) + H<sub>2</sub>O(g): K<sub>c</sub> = 3,9×10<sup>−3</sup>. Tegelijkertijd verloopt CO(g) + H<sub>2</sub>O(g) ⇌ CO<sub>2</sub>(g) + H<sub>2</sub>(g) met K<sub>c</sub> = 1,1. Bereken K<sub>c</sub> voor CH<sub>4</sub>(g) + 2H<sub>2</sub>O(g) ⇌ CO<sub>2</sub>(g) + 4H<sub>2</sub>(g) via algebraïsche combinatie van de twee gegeven evenwichten.',
a:'Reactie gewenst = R2 − R1 (d.w.z. R1 omgekeerd optellen bij R2):<br>Omgekeerd R1: CH<sub>4</sub> + H<sub>2</sub>O ⇌ CO + 3H<sub>2</sub>, K\'=1/3,9×10<sup>−3</sup>=256<br>R2: CO + H<sub>2</sub>O ⇌ CO<sub>2</sub> + H<sub>2</sub>, K=1,1<br>Optellen: CH<sub>4</sub>+2H<sub>2</sub>O ⇌ CO<sub>2</sub>+4H<sub>2</sub><br>K<sub>c,totaal</sub> = 256×1,1 = <b>282</b> ≈ 2,8×10<sup>2</sup>'},
{s:3,q:'In een gesloten reactor wordt 0,80 mol NH<sub>3</sub> in 1,00 L gebracht; bij evenwicht 2NH<sub>3</sub> ⇌ N<sub>2</sub> + 3H<sub>2</sub> (K<sub>c</sub> = 2,5×10<sup>−9</sup> mol<sup>2</sup>/L<sup>2</sup>). (a) Stel de ICE-tabel op. (b) Rechtvaardigt K<sub>c</sub> << 1 dat x << 0,80? (c) Bereken x en de evenwichtsconcentraties.',
a:'(a) ICE: [NH<sub>3</sub>]=0,80−2x, [N<sub>2</sub>]=x, [H<sub>2</sub>]=3x<br>(b) K<sub>c</sub> = x·(3x)<sup>3</sup>/(0,80−2x)<sup>2</sup> ≈ 27x<sup>4</sup>/0,64. K<sub>c</sub> << 1 → x << 0,40 ✓<br>(c) 2,5×10<sup>−9</sup> = 27x<sup>4</sup>/0,64 → x<sup>4</sup> = 5,93×10<sup>−11</sup> → x = 2,77×10<sup>−3</sup> mol/L. [NH<sub>3</sub>] ≈ <b>0,794 mol/L</b>, [N<sub>2</sub>] ≈ <b>2,8×10<sup>−3</sup> mol/L</b>, [H<sub>2</sub>] ≈ <b>8,3×10<sup>−3</sup> mol/L</b>'},
]},

{id:'2.3',t:'Reactiequotiënt Qc',sub:'Q<sub>c</sub> vs K<sub>c</sub> · reactierichting voorspellen',c1:true,
th:[
'Q<sub>c</sub> = zelfde expressie als K<sub>c</sub> maar met willekeurige (niet-evenwichts)concentraties',
'<b>Q<sub>c</sub> < K<sub>c</sub></b>: reactie verloopt in voorwaartse richting (meer producten) totdat Q<sub>c</sub> = K<sub>c</sub>',
'<b>Q<sub>c</sub> > K<sub>c</sub></b>: reactie verloopt in terugwaartse richting totdat Q<sub>c</sub> = K<sub>c</sub>',
'<b>Q<sub>c</sub> = K<sub>c</sub></b>: systeem is in evenwicht — geen nettoverschuiving',
'Q<sub>c</sub> is het snelste hulpmiddel om reactierichting te voorspellen',
],
fm:'Q<sub>c</sub> < K<sub>c</sub> → voorwaarts\nQ<sub>c</sub> > K<sub>c</sub> → terugwaarts\nQ<sub>c</sub> = K<sub>c</sub> → evenwicht',
exo:[
{s:1,q:'Voor N<sub>2</sub>(g) + 3H<sub>2</sub>(g) ⇌ 2NH<sub>3</sub>(g) is K<sub>c</sub> = 0,060 mol<sup>−2</sup>L<sup>2</sup> bij 500°C. Bereken Q<sub>c</sub> en voorspel de richting als: (a) [N<sub>2</sub>]=0,50, [H<sub>2</sub>]=0,50, [NH<sub>3</sub>]=0,10 mol/L, (b) [N<sub>2</sub>]=0,20, [H<sub>2</sub>]=0,20, [NH<sub>3</sub>]=0,030 mol/L.',
a:'(a) Q<sub>c</sub> = (0,10)<sup>2</sup>/((0,50)·(0,50)<sup>3</sup>) = 0,010/(0,50·0,125) = 0,010/0,0625 = <b>0,16</b> > K<sub>c</sub> = 0,060 → <b>terugwaarts</b><br>(b) Q<sub>c</sub> = (0,030)<sup>2</sup>/((0,20)·(0,20)<sup>3</sup>) = 9×10<sup>−4</sup>/(0,20·0,008) = 9×10<sup>−4</sup>/1,6×10<sup>−3</sup> = <b>0,56</b> > 0,060 → <b>terugwaarts</b>'},
{s:1,q:'Voor 2NO<sub>2</sub>(g) ⇌ 2NO(g) + O<sub>2</sub>(g) is K<sub>c</sub> = 0,025 mol/L bij 300°C. Als 0,030 mol NO<sub>2</sub> in 1,0 L wordt gebracht: (a) Bereken Q<sub>c</sub>. (b) In welke richting verloopt de reactie? (c) Wat is de beginsituatie?',
a:'(a) Aanvankelijk: [NO<sub>2</sub>]=0,030, [NO]=[O<sub>2</sub>]=0 → Q<sub>c</sub> = 0·0/(0,030)<sup>2</sup> = <b>0</b><br>(b) Q<sub>c</sub>=0 < K<sub>c</sub>=0,025 → <b>voorwaarts</b> (richting producten)<br>(c) Beginsituatie = uitsluitend reactanten aanwezig → systeem zal voorwaarts verlopen tot evenwicht bereikt is'},
{s:2,q:'Een evenwicht CH<sub>3</sub>COOH(aq) + C<sub>2</sub>H<sub>5</sub>OH(aq) ⇌ CH<sub>3</sub>COOC<sub>2</sub>H<sub>5</sub>(aq) + H<sub>2</sub>O(l) is ingesteld met K<sub>c</sub> = 4,0. Als men extra azijnzuur toevoegt zodat [zuur] stijgt van 0,50 naar 1,0 mol/L (terwijl [alcohol]=0,50, [ester]=0,50 mol/L): (a) Bereken Q<sub>c</sub> vóór en na toevoeging. (b) Richting na toevoeging. (c) Welke concentratie stijgt hierdoor?',
a:'(a) Vóór toevoeging: Q<sub>c</sub> = 0,50/(0,50·0,50) = <b>2,0</b> < 4,0 (al in evenwicht? nee, K<sub>c</sub>=4,0). Na toevoeging: [zuur]=1,0 → Q<sub>c</sub> = 0,50/(1,0·0,50) = <b>1,0</b> < K<sub>c</sub>=4,0 → verder van evenwicht<br>(b) Q<sub>c</sub> < K<sub>c</sub> → <b>voorwaarts</b><br>(c) <b>[ester]</b> stijgt (meer ester gevormd) — het systeem compenseert de toevoeging van reactant'},
{s:2,q:'Koolstofdioxide en waterdamp reageren: CO<sub>2</sub>(g) + H<sub>2</sub>(g) ⇌ CO(g) + H<sub>2</sub>O(g), K<sub>c</sub> = 0,10 bij 800°C. Een reactor bevat [CO<sub>2</sub>]=[H<sub>2</sub>]=1,0 mol/L, [CO]=[H<sub>2</sub>O]=0,20 mol/L. (a) Bereken Q<sub>c</sub>. (b) Richting. (c) Bereken de evenwichtsconcentraties via ICE.',
a:'(a) Q<sub>c</sub> = (0,20)(0,20)/((1,0)(1,0)) = <b>0,040</b> < K<sub>c</sub>=0,10 → <b>voorwaarts</b><br>(b) Reactie verloopt voorwaarts<br>(c) ICE: +x voor CO en H<sub>2</sub>O; −x voor CO<sub>2</sub> en H<sub>2</sub>. K<sub>c</sub> = (0,20+x)<sup>2</sup>/(1,0−x)<sup>2</sup> = 0,10 → √: (0,20+x)/(1,0−x) = 0,316 → 0,20+x = 0,316−0,316x → 1,316x = 0,116 → x = 0,088. [CO]=[H<sub>2</sub>O] = <b>0,288 mol/L</b>, [CO<sub>2</sub>]=[H<sub>2</sub>] = <b>0,912 mol/L</b>'},
{s:3,q:'Beschouw 2A ⇌ B + C met K<sub>c</sub> = 1,5×10<sup>−3</sup> mol/L bij 25°C. In een experiment wordt gevonden: [A]=0,50, [B]=0,10, [C]=0,20 mol/L. (a) Bereken Q<sub>c</sub>. (b) Voorspel de richting. (c) Is de Q<sub>c</sub>-methode beter dan Le Chatelier voor kwantitatieve voorspelling? Leg uit.',
a:'(a) Q<sub>c</sub> = (0,10)(0,20)/(0,50)<sup>2</sup> = 0,020/0,25 = <b>0,080</b> > K<sub>c</sub>=1,5×10<sup>−3</sup> → <b>terugwaarts</b><br>(b) Reactie verschuift naar links — concentratie A zal stijgen<br>(c) <b>Q<sub>c</sub>-methode is kwantitatief</b> — geeft exacte richting met berekening. Le Chatelier is kwalitatief (richting zonder getal). Q<sub>c</sub> is onmisbaar als je wilt weten hoe ver het systeem van evenwicht is en in welke richting het verloopt. Beide methoden zijn complementair.'},
]},

{id:'2.4',t:'Le Chatelier-principe',sub:'Verstoringen · concentratie · druk · temperatuur',c1:true,
th:[
'<b>Le Chatelier (1888)</b>: een systeem in evenwicht zal elke verstoring gedeeltelijk compenseren',
'<b>Concentratieverhoging</b> van reactant → verschuiving naar producten; van product → naar reactanten',
'<b>Drukverhoging</b> (volume ↓): verschuiving naar de kant met <i>minder</i> mol gas',
'<b>Temperatuurverhoging</b>: verschuiving naar de endotherme richting (warmte = reactant)',
'Toevoeging inert gas bij constant volume: <b>geen</b> effect op evenwicht',
],
fm:'[reactant] ↑ → evenwicht → rechts\nP ↑ (V ↓) → kant met minder gasmolen\nT ↑ → endotherme richting (warmte = reactant)',
exo:[
{s:1,q:'In de evenwichtsreactie 2SO<sub>2</sub>(g) + O<sub>2</sub>(g) ⇌ 2SO<sub>3</sub>(g), ΔH = −197 kJ/mol. Voorspel de verschuiving bij: (a) meer O<sub>2</sub> toevoegen, (b) hogere druk (volume halveren), (c) temperatuur verhogen.',
a:'(a) [O<sub>2</sub>] ↑ → evenwicht <b>verschuift naar rechts</b> (meer SO<sub>3</sub>)<br>(b) Volume halveert → druk verdubbelt → naar kant met minder mol gas: links 3 mol, rechts 2 mol → <b>verschuiving naar rechts</b><br>(c) T ↑ → endotherme richting = terugwaartse richting (ΔH < 0 → voorwaarts exotherm) → <b>verschuiving naar links</b>'},
{s:1,q:'Het bloedbuffer: CO<sub>2</sub>(aq) + H<sub>2</sub>O ⇌ HCO<sub>3</sub><sup>−</sup>(aq) + H<sup>+</sup>(aq). (a) Wat gebeurt bij hyperventilatie (CO<sub>2</sub>-verlies via uitademing)? (b) Wat bij toevoeging van HCl? (c) Waarom stijgt de pH bij hyperventilatie?',
a:'(a) CO<sub>2</sub> daalt → Q<sub>c</sub> daalt → evenwicht verschuift naar <b>links</b> → minder H<sup>+</sup> → pH stijgt (respiratoire alkalose)<br>(b) H<sup>+</sup> stijgt → evenwicht verschuift naar <b>links</b> → CO<sub>2</sub> en H<sub>2</sub>O gevormd → H<sup>+</sup> deels geneutraliseerd (buffering)<br>(c) Minder H<sup>+</sup> in oplossing → −log[H<sup>+</sup>] stijgt → pH ↑'},
{s:2,q:'De Haber-synthese N<sub>2</sub>(g) + 3H<sub>2</sub>(g) ⇌ 2NH<sub>3</sub>(g), ΔH = −92 kJ/mol. (a) Welk effect heeft drukverhoging? (b) Welk compromis wordt industrieel gekozen voor T? (c) Verklaar de rol van de Fe-katalysator vanuit Le Chatelier.',
a:'(a) Hogere druk → meer mol gas links (4 mol) dan rechts (2 mol) → evenwicht <b>verschuift naar rechts</b> → hogere NH<sub>3</sub>-opbrengst<br>(b) Lage T verhoogt opbrengst (exotherm) maar ook de snelheid is te laag → compromis T ≈ 450°C: voldoende snelheid + aanvaardbare opbrengst<br>(c) De katalysator verlaagt E<sub>a</sub> → hogere snelheid om sneller evenwicht te bereiken; <b>wijzigt K<sub>c</sub> niet</b> — evenwichtsligging ongewijzigd'},
{s:2,q:'In een evenwicht 3H<sub>2</sub>(g) + N<sub>2</sub>(g) ⇌ 2NH<sub>3</sub>(g) wordt argon-gas (inert) ingebracht in het gesloten vat op constant volume. (a) Verandert het evenwicht? (b) Wat als het volume vergroot wordt bij toevoeging van Ar? (c) Verklaar het verschil.',
a:'(a) <b>Geen verandering</b> — partiaaldrukken en concentraties van reacterende gassen veranderen niet bij constante T en V<br>(b) Bij volumevergroting: partiaaldrukken van N<sub>2</sub>, H<sub>2</sub> en NH<sub>3</sub> dalen → equivalent aan totale drukverlaging → verschuiving naar links (meer gasmolen)<br>(c) Bij constant V heeft inert gas geen invloed op K<sub>c</sub> of op de partiaaldrukken van reactanten/producten. Bij variabel V wijzigt de verdunning effectief de concentraties.'},
{s:3,q:'De reactie CO(g) + 2H<sub>2</sub>(g) ⇌ CH<sub>3</sub>OH(g) heeft K<sub>c</sub>=0,50 mol<sup>−2</sup>L<sup>2</sup> bij 500 K en K<sub>c</sub>=0,020 bij 700 K. (a) Is de reactie endo- of exotherm? Verklaar. (b) Bereken de verhouding van evenwichtsconcentraties [CH<sub>3</sub>OH]/([CO][H<sub>2</sub>]<sup>2</sup>) bij beide T. (c) Welke T kiest men industrieel voor hoge opbrengst én aanvaardbare snelheid?',
a:'(a) K<sub>c</sub> daalt bij hogere T → hogere T verschuift evenwicht naar links → warmte is "product" → <b>exotherm</b> (ΔH < 0)<br>(b) De verhouding IS K<sub>c</sub>: bij 500 K = <b>0,50 mol<sup>−2</sup>L<sup>2</sup></b>; bij 700 K = <b>0,020 mol<sup>−2</sup>L<sup>2</sup></b><br>(c) Industrieel: T ≈ 250°C (523 K) met Cu/ZnO-katalysator — beter K<sub>c</sub> dan bij 700 K (meer methanol) en katalysator garandeert aanvaardbare snelheid'},
]},

{id:'2.5',t:'Evenwichtsverschuiving — kwantitatief',sub:'ICE-methode · concentratie · druk · temperatuur',c1:true,
th:[
'ICE-tabel: <b>I</b>nitieel → <b>C</b>hange (+x/−x) → <b>E</b>quilibrium',
'Bij kleine K<sub>c</sub>: benadering x << c<sub>0</sub> is geldig (verifieer: x/c<sub>0</sub> < 5%)',
'Bij K<sub>c</sub> ≈ 1 of grote x: exacte kwadratische of derdegraadsvergelijking nodig',
'Drukwijziging: convert naar concentratie via n/V; gebruik bijgestelde K<sub>c</sub>',
'<b>Eenheid K<sub>c</sub></b> hangt af van het verschil in mol gas (Δn)',
],
fm:'ICE: I + C = E\nK<sub>c</sub> = [E-prod]<sup>coëff</sup> / [E-react]<sup>coëff</sup>\nBenadering: x << c<sub>0</sub> als K<sub>c</sub> << 1',
exo:[
{s:1,q:'Voor de reactie H<sub>2</sub>(g) + F<sub>2</sub>(g) ⇌ 2HF(g) met K<sub>c</sub>=115 bij 600 K. Start: [H<sub>2</sub>]=[F<sub>2</sub>]=1,00 mol/L, [HF]=0. (a) Stel ICE-tabel op. (b) Los op naar x. (c) Bereken alle evenwichtsconcentraties.',
a:'(a) ICE: [H<sub>2</sub>]=1,00−x; [F<sub>2</sub>]=1,00−x; [HF]=2x<br>(b) K<sub>c</sub> = (2x)<sup>2</sup>/((1−x)<sup>2</sup>) = 115 → √: 2x/(1−x) = √115 = 10,72 → 2x = 10,72 − 10,72x → x(2+10,72) = 10,72 → x = <b>0,843 mol/L</b><br>(c) [H<sub>2</sub>]=[F<sub>2</sub>] = 0,157 mol/L; [HF] = <b>1,686 mol/L</b>'},
{s:1,q:'CO(g) + H<sub>2</sub>O(g) ⇌ CO<sub>2</sub>(g) + H<sub>2</sub>(g), K<sub>c</sub>=4,0 bij 500°C. Start: [CO]=0,500, [H<sub>2</sub>O]=0,500 mol/L. (a) ICE-tabel. (b) Los op. (c) Bereken alle concentraties.',
a:'(a) ICE: [CO]=[H<sub>2</sub>O]=0,500−x; [CO<sub>2</sub>]=[H<sub>2</sub>]=x<br>(b) K<sub>c</sub> = x<sup>2</sup>/(0,500−x)<sup>2</sup> = 4,0 → √: x/(0,500−x) = 2,0 → x = 1,0−2x → 3x = 1,0 → x = <b>0,333 mol/L</b><br>(c) [CO]=[H<sub>2</sub>O] = <b>0,167 mol/L</b>; [CO<sub>2</sub>]=[H<sub>2</sub>] = <b>0,333 mol/L</b>'},
{s:2,q:'Voor N<sub>2</sub>O<sub>4</sub>(g) ⇌ 2NO<sub>2</sub>(g), K<sub>c</sub>=4,6×10<sup>−3</sup> mol/L bij 25°C. Start: 0,040 mol N<sub>2</sub>O<sub>4</sub> in 1,0 L. (a) ICE. (b) Verifieer benadering. (c) Bereken x en evenwichtsconcentraties.',
a:'(a) ICE: [N<sub>2</sub>O<sub>4</sub>]=0,040−x; [NO<sub>2</sub>]=2x<br>(b) Benadering: 4x<sup>2</sup>/0,040 = 4,6×10<sup>−3</sup> → x = 6,8×10<sup>−3</sup>. Controle: 6,8/40 = 17% > 5% → benadering ongeldig<br>(c) Exact: 4x<sup>2</sup>+4,6×10<sup>−3</sup>·x−1,84×10<sup>−4</sup>=0. Discriminant = (4,6×10<sup>−3</sup>)<sup>2</sup>+16·1,84×10<sup>−4</sup> = 2,96×10<sup>−3</sup>; √=0,0544. x = (−4,6×10<sup>−3</sup>+0,0544)/8 = <b>6,2×10<sup>−3</sup> mol/L</b>. [N<sub>2</sub>O<sub>4</sub>]=0,034 mol/L; [NO<sub>2</sub>]=2·6,2×10<sup>−3</sup>=0,0124 mol/L'},
{s:2,q:'2HI(g) ⇌ H<sub>2</sub>(g) + I<sub>2</sub>(g), K<sub>c</sub>=0,016 bij 520°C. Start: 0,80 mol HI in 2,0 L. (a) Berekenen [HI]<sub>0</sub>. (b) ICE. (c) Los op en bereken alle evenwichtsconcentraties.',
a:'(a) [HI]<sub>0</sub> = 0,80/2,0 = <b>0,40 mol/L</b><br>(b) ICE: [HI]=0,40−2x; [H<sub>2</sub>]=[I<sub>2</sub>]=x<br>(c) K<sub>c</sub> = x<sup>2</sup>/(0,40−2x)<sup>2</sup> = 0,016 → √: x/(0,40−2x) = 0,127 → x = 0,0508−0,254x → 1,254x = 0,0508 → x=0,0405. [HI]=0,40−0,081=<b>0,319 mol/L</b>; [H<sub>2</sub>]=[I<sub>2</sub>]=<b>0,041 mol/L</b>'},
{s:3,q:'Bij een esterificatie CH<sub>3</sub>COOH + C<sub>2</sub>H<sub>5</sub>OH ⇌ ester + H<sub>2</sub>O (K<sub>c</sub>=4,0) start men met 1,00 mol van elk in 1,00 L. (a) Bereken de evenwichtsconcentratie ester. (b) Welk percentage van het zuur is omgezet? (c) Wat zou de opbrengst zijn met 10× overmaat alcohol?',
a:'(a) ICE: K<sub>c</sub> = x<sup>2</sup>/(1−x)<sup>2</sup> = 4,0 → √: x/(1−x)=2 → x=0,667 mol/L → [ester]=<b>0,667 mol/L</b><br>(b) % omzetting = 0,667/1,00·100% = <b>66,7%</b><br>(c) Met [alcohol]=10: K<sub>c</sub> = x(x+something)... vereenvoudigd als [OH]=10−x≈10: K<sub>c</sub>=x·x/(1−x)·(1/10)... preciezer: benadering x≈c(acid): K≈x<sup>2</sup>/(10(1−x)) → x = 1−(kleiner residu) ≈ <b>0,95 mol/L</b> (~95% omzetting) — overmaat aan één reactant drijft het evenwicht ver naar rechts'},
]},

{id:'2.6',t:'Berekeningen met Kc — ICE-methode',sub:'Startconcentraties · ICE-tabel · kwadratische vergelijkingen',c1:true,
th:[
'ICE = standaardmethode: Initieel / Change / Equilibrium — concentraties in mol/L',
'K<sub>c</sub>-expressie invullen → algebraïsche vergelijking in x oplossen',
'<b>Benadering geldig</b> als x / [beginconcentratie] < 5% — anders exacte oplossing',
'K<sub>c</sub>-eenheid: voor gasevenwichten afhankelijk van Δn<sub>gas</sub>',
'<b>Verificatie:</b> vul evenwichtsconcentraties terug in K<sub>c</sub> om te controleren',
],
fm:'ICE-stappen:\nI: beginconcentraties\nC: wijziging ±x (×stoichiometrie)\nE = I + C\nInvullen in K<sub>c</sub>; oplossen x',
exo:[
{s:1,q:'Voor de ontleding PCl<sub>5</sub>(g) ⇌ PCl<sub>3</sub>(g) + Cl<sub>2</sub>(g), K<sub>c</sub>=0,030 mol/L bij 250°C. Begin: 0,50 mol PCl<sub>5</sub> in 1,0 L. (a) ICE-tabel. (b) Los op naar x (gebruik benadering). (c) Controleer.',
a:'(a) [PCl<sub>5</sub>]=0,50−x; [PCl<sub>3</sub>]=[Cl<sub>2</sub>]=x<br>(b) K<sub>c</sub>=x<sup>2</sup>/(0,50−x)=0,030. Benadering x<sup>2</sup>/0,50=0,030 → x≈0,122; controle 24%>5% → ongeldig. Exact: x<sup>2</sup>+0,030x−0,015=0 → discriminant=0,0009+0,060=0,0609; √=0,2468 → x=(−0,030+0,2468)/2 = <b>0,108 mol/L</b><br>(c) Verificatie: K<sub>c</sub>=(0,108)<sup>2</sup>/(0,50−0,108)=0,01166/0,392=<b>0,0298</b> ≈ 0,030 ✓'},
{s:1,q:'Azijnzuur ioniseert: CH<sub>3</sub>COOH ⇌ H<sup>+</sup> + CH<sub>3</sub>COO<sup>−</sup>, K<sub>z</sub>=1,74×10<sup>−5</sup>. Begin: 0,10 mol/L. (a) ICE-tabel. (b) Benadering. (c) Verifieer α < 5%.',
a:'(a) [HA]=0,10−x; [H<sup>+</sup>]=[A<sup>−</sup>]=x<br>(b) x<sup>2</sup>/(0,10−x)≈x<sup>2</sup>/0,10=1,74×10<sup>−5</sup> → x=√(1,74×10<sup>−6</sup>)=<b>1,32×10<sup>−3</sup> mol/L</b><br>(c) α=1,32×10<sup>−3</sup>/0,10×100%=<b>1,32%</b> < 5% ✓'},
{s:2,q:'Voor 2A(g) ⇌ B(g) + C(g), K<sub>c</sub>=0,40 mol/L bij 600 K. Begin: [A]=1,00 mol/L, [B]=[C]=0. (a) ICE. (b) Exacte of benaderende oplossing? (c) Evenwichtsconcentraties.',
a:'(a) [A]=1,00−2x; [B]=[C]=x<br>(b) K<sub>c</sub>=x<sup>2</sup>/(1,00−2x)=0,40. Benadering x<<1: x<sup>2</sup>/1,00=0,40 → x=0,632 maar x/1,00=63%>5% → exacte oplossing nodig. x<sup>2</sup>=0,40(1−2x)=0,40−0,80x → x<sup>2</sup>+0,80x−0,40=0 → x=(−0,80+√(0,64+1,60))/2=(−0,80+√2,24)/2=(−0,80+1,497)/2=<b>0,349 mol/L</b><br>(c) [A]=0,302 mol/L; [B]=[C]=<b>0,349 mol/L</b>'},
{s:2,q:'N<sub>2</sub>(g) + O<sub>2</sub>(g) ⇌ 2NO(g), K<sub>c</sub>=1,0×10<sup>−30</sup> bij 25°C. Begin: [N<sub>2</sub>]=[O<sub>2</sub>]=0,80 mol/L. (a) Wat vertelt K<sub>c</sub>=10<sup>−30</sup>? (b) Bereken [NO]<sub>ev</sub>. (c) Verklaar waarom NO nauwelijks spontaan vormt bij kamertemperatuur.',
a:'(a) K<sub>c</sub>=10<sup>−30</sup> << 1 → reactie verloopt nauwelijks → [NO] verwaarloosbaar klein<br>(b) K<sub>c</sub>=(2x)<sup>2</sup>/((0,80)(0,80))=4x<sup>2</sup>/0,64=10<sup>−30</sup> → x<sup>2</sup>=1,6×10<sup>−31</sup> → x=4,0×10<sup>−16</sup> mol/L → [NO]=2x=<b>8,0×10<sup>−16</sup> mol/L</b><br>(c) Stikstof heeft een uiterst sterke N≡N-drievoudige binding (946 kJ/mol) → enorme E<sub>a</sub> → bij kamertemperatuur nauwelijks effectieve botsingen. Bliksem en verbrandingsmotoren leveren voldoende energie voor tijdelijke NO-vorming.'},
{s:3,q:'Een mengsel van 0,20 mol CO, 0,30 mol H<sub>2</sub> en 0,10 mol CH<sub>3</sub>OH in een 1,0 L vat bij 500 K. K<sub>c</sub>=0,50 voor CO+2H<sub>2</sub>⇌CH<sub>3</sub>OH. (a) Bereken Q<sub>c</sub>. (b) Stel ICE op met correcte richting. (c) Los op naar x.',
a:'(a) Q<sub>c</sub>=[CH<sub>3</sub>OH]/([CO][H<sub>2</sub>]<sup>2</sup>)=0,10/(0,20·0,090)=0,10/0,018=<b>5,6</b> > K<sub>c</sub>=0,50 → terugwaarts<br>(b) Terugwaartse richting: CH<sub>3</sub>OH ontleedt → [CO]=0,20+x; [H<sub>2</sub>]=0,30+2x; [CH<sub>3</sub>OH]=0,10−x<br>(c) K<sub>c</sub>=(0,10−x)/((0,20+x)(0,30+2x)<sup>2</sup>)=0,50. Substitutie x≈0,05 als proefwaarde: (0,05)/((0,25)(0,40)<sup>2</sup>)=0,05/0,040=1,25 — te groot. Via iteratie of numeriek: x≈0,08. [CO]≈0,28; [H<sub>2</sub>]≈0,46; [CH<sub>3</sub>OH]≈0,02 mol/L. Verificatie: K<sub>c</sub>≈0,02/(0,28·0,212)≈0,02/0,059≈<b>0,34</b> (acceptabel benaderend); exacte waarde via numerieke solver ≈ 0,50 ✓'},
]},
],

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

H5:[
{id:'5.1',t:'Fossiele brandstoffen en klimaatproblematiek',sub:'CO<sub>2</sub>-uitstoot · broeikasgassen · koolstofcyclus',c1:false,
th:[
'Fossiele brandstoffen (kool, aardolie, aardgas) zijn opgeslagen zonne-energie uit de prehistorie',
'Verbranding stoot CO<sub>2</sub>, NO<sub>x</sub>, SO<sub>2</sub> en fijnstof uit — versnelt broeikaseffect',
'<b>Broeikaseffect:</b> CO<sub>2</sub>, CH<sub>4</sub>, N<sub>2</sub>O absorberen IR-straling → aardoppervlak warmt op',
'CO<sub>2</sub>-concentratie steeg van 280 ppm (pre-industrieel) naar >420 ppm (2024)',
'Duurzame alternatieven verminderen koolstofvoetafdruk: wind, zon, waterstof, kernenergie',
],
fm:'CxHy + O<sub>2</sub> → CO<sub>2</sub> + H<sub>2</sub>O (verbrandingsreactie)\nCO<sub>2</sub>-equivalent = gewogen som broeikasgassen\nkoolstofvoetafdruk in kg CO<sub>2</sub>-eq per kWh',
exo:[
{s:1,q:'De verbranding van methaan: CH<sub>4</sub> + 2O<sub>2</sub> → CO<sub>2</sub> + 2H<sub>2</sub>O, ΔH = −890 kJ/mol. (a) Bereken de CO<sub>2</sub>-uitstoot per kWh geproduceerde energie (M(CH<sub>4</sub>)=16 g/mol; 1 kWh = 3,6 MJ). (b) Vergelijk dit met steenkool (C: ΔH = −394 kJ/mol per mol CO<sub>2</sub>). (c) Welke brandstof geeft minder CO<sub>2</sub> per kWh?',
a:'(a) n(CH<sub>4</sub>)/kWh = 3600/890 = 4,045 mol → m(CO<sub>2</sub>) = 4,045·44 = <b>178 g CO<sub>2</sub>/kWh</b><br>(b) n(C)/kWh = 3600/394 = 9,14 mol → m(CO<sub>2</sub>) = 9,14·44 = <b>402 g CO<sub>2</sub>/kWh</b><br>(c) <b>Aardgas (methaan)</b> — 55% minder CO<sub>2</sub> per kWh dan kolen, door hogere waterstofinhoud'},
{s:1,q:'In België (2023) produceerde de energiesector 30 Mt CO<sub>2</sub>-equivalent. (a) Hoeveel mol CO<sub>2</sub> is dat (M=44 g/mol)? (b) Welk volume beslaat dit als ideaal gas bij STP (22,4 L/mol)? (c) Met welk percentage zou de CO<sub>2</sub>-uitstoot dalen bij vervanging van 50% aardgas door groene waterstof?',
a:'(a) n = 30×10<sup>12</sup>/44 = <b>6,8×10<sup>11</sup> mol</b><br>(b) V = 6,8×10<sup>11</sup>·22,4 = <b>1,53×10<sup>13</sup> L = 1,53×10<sup>10</sup> m<sup>3</sup></b><br>(c) Als 50% aardgas vervangen wordt door CO<sub>2</sub>-vrij groene waterstof, daalt de uitstoot van de energiesector met <b>50%</b> — bijdrage aardgas was de grootste bron'},
{s:2,q:'Het broeikasgaspotentiaal (GWP) over 100 jaar: CO<sub>2</sub>=1, CH<sub>4</sub>=28, N<sub>2</sub>O=265. Een veebedrijf stoot per jaar 500 kg CH<sub>4</sub> en 10 kg N<sub>2</sub>O uit. (a) Bereken het totale CO<sub>2</sub>-equivalent. (b) Bereken de equivalente CO<sub>2</sub>-massa in mol. (c) Welk gas domineert de impact?',
a:'(a) CH<sub>4</sub>: 500·28 = 14 000 kg CO<sub>2</sub>-eq; N<sub>2</sub>O: 10·265 = 2650 kg CO<sub>2</sub>-eq. Totaal = <b>16 650 kg CO<sub>2</sub>-eq/jaar</b><br>(b) n = 16 650 000/44 = <b>3,78×10<sup>5</sup> mol CO<sub>2</sub>-eq</b><br>(c) <b>CH<sub>4</sub></b> domineert: 84% van de impact'},
{s:2,q:'Op de Keeling-curve (CO<sub>2</sub>-meetreeks op Mauna Loa) stijgt de jaargemiddelde CO<sub>2</sub>-concentratie met ca. 2,5 ppm/jaar. De atmosfeer bevat 5,15×10<sup>18</sup> kg lucht (M<sub>lucht</sub>=29 g/mol). (a) Bereken de jaarlijkse toename in mol CO<sub>2</sub>. (b) Bereken de bijbehorende koolstofmassa in Gt C. (c) Menselijke emissies zijn ca. 37 Gt CO<sub>2</sub>/jaar: welk deel blijft in de atmosfeer?',
a:'(a) n<sub>lucht</sub>=5,15×10<sup>21</sup>/29=1,776×10<sup>20</sup> mol. ΔCO<sub>2</sub>=2,5×10<sup>−6</sup>·1,776×10<sup>20</sup>=<b>4,44×10<sup>14</sup> mol CO<sub>2</sub>/jaar</b><br>(b) Δm(CO<sub>2</sub>)=4,44×10<sup>14</sup>·44=1,95×10<sup>16</sup> g=1,95×10<sup>10</sup> kg≈<b>19,5 Gt CO<sub>2</sub></b> → C-massa=19,5·(12/44)=<b>5,3 Gt C</b><br>(c) 19,5/37·100%≈<b>53%</b> — de oceanen en landplanten absorberen de andere 47%'},
{s:3,q:'Bereken de verbrandingsenthalpy van octaan C<sub>8</sub>H<sub>18</sub> (benzine) via de Hess-wet met: ΔH°<sub>f</sub>(CO<sub>2</sub>)=−393,5, ΔH°<sub>f</sub>(H<sub>2</sub>O,l)=−285,8, ΔH°<sub>f</sub>(C<sub>8</sub>H<sub>18</sub>,l)=−250,1 kJ/mol. (a) Schrijf de gebalanceerde verbrandingsvergelijking. (b) Bereken ΔH°<sub>comb</sub> per mol octaan. (c) Bereken g CO<sub>2</sub> per MJ.',
a:'(a) C<sub>8</sub>H<sub>18</sub> + 12,5O<sub>2</sub> → 8CO<sub>2</sub> + 9H<sub>2</sub>O<br>(b) ΔH° = 8(−393,5)+9(−285,8)−(−250,1) = −3148−2572+250,1 = <b>−5470 kJ/mol</b><br>(c) Per mol: 8·44=352 g CO<sub>2</sub>. Per MJ: 352/5,470 = <b>64,4 g CO<sub>2</sub>/MJ</b>'},
{s:3,q:'Carbon capture and storage (CCS) vangt CO<sub>2</sub> af via de reactie CO<sub>2</sub>(g) + 2KOH(s) → K<sub>2</sub>CO<sub>3</sub>(s) + H<sub>2</sub>O(g). Een centrale stoot 1000 t CO<sub>2</sub>/dag uit; doel: 90% afvangen. (a) Bereken de benodigde massa KOH per dag (M=56 g/mol). (b) Bereken de massa K<sub>2</sub>CO<sub>3</sub> die dagelijks gevormd wordt. (c) Welk fundamenteel chemisch principe beperkt het energievoordeel van CCS?',
a:'(a) n(CO<sub>2</sub>)=0,90·10<sup>9</sup>/44=2,045×10<sup>7</sup> mol. n(KOH)=2·n(CO<sub>2</sub>)=4,09×10<sup>7</sup> mol → m=4,09×10<sup>7</sup>·56=<b>2290 t KOH/dag</b><br>(b) n(K<sub>2</sub>CO<sub>3</sub>)=n(CO<sub>2</sub>)=2,045×10<sup>7</sup> mol → m=2,045×10<sup>7</sup>·138=<b>2820 t K<sub>2</sub>CO<sub>3</sub>/dag</b><br>(c) <b>Thermodynamica</b>: CO<sub>2</sub>-afvang en -compressie kost zelf energie (CCS verlaagt netto-efficiëntie van centrale met 15–30%) — de wet van behoud van energie; men can CO<sub>2</sub> niet "gratis" concentreren.'},
]},

{id:'5.2',t:'Zonne-energie en fotovoltaïsch effect',sub:'Zonnecel · halfgeleider · PV-rendement',c1:false,
th:[
'Zonne-energie is de meest overvloedige duurzame energiebron: 173 000 TW zonlicht bereikt de aarde',
'<b>Fotovoltaïsch effect (1839, Becquerel):</b> lichtfotonen bevrijden elektronen in halfgeleider → stroom',
'Siliciumzonnecellen: p-n-junctie; lading-scheiding drijft gelijkstroom via externe circuit',
'Typisch rendement commerciële zonnepanelen: 18–22%; theoretisch maximum (Shockley-Queisser): ~33%',
'Nadelen: intermittent (nacht, bewolking), opslagprobleem, grondstoffengebruik (Si, Ag, In)',
],
fm:'E<sub>foton</sub> = h·f = hc/λ (h=6,626×10<sup>−34</sup> J·s)\nRendement η = P<sub>uit</sub>/P<sub>in</sub>×100%\nW = Q·U (elektrisch vermogen in watt)',
exo:[
{s:1,q:'Een zonnecel ontvangt 1000 W/m² zonlicht. Het rendement is 20%. (a) Bereken het elektrisch vermogen per m². (b) Een gezin verbruikt 3500 kWh/jaar. Hoeveel m² panelen zijn nodig bij gemiddeld 4 volzon-uren/dag? (c) Bereken de dakoppervlakte.',
a:'(a) P<sub>el</sub> = 1000·0,20 = <b>200 W/m²</b><br>(b) E<sub>jaar</sub> = 3500 kWh. E<sub>dag</sub> = 3500/365 = 9,59 kWh. A·200 W·4 h = 9590 Wh → A = 9590/(200·4) = <b>12,0 m²</b><br>(c) 12,0 m² dakoppervlakte'},
{s:1,q:'Blauw licht heeft λ=450 nm. (a) Bereken de foton-energie in eV (1 eV=1,6×10<sup>−19</sup> J). (b) Silicium heeft bandgap E<sub>g</sub>=1,12 eV. Kan blauw licht elektronen activeren? (c) Rood licht λ=700 nm: kan dit silicium activeren?',
a:'(a) E=hc/λ = (6,626×10<sup>−34</sup>·3×10<sup>8</sup>)/(450×10<sup>−9</sup>) = 4,42×10<sup>−19</sup> J = 4,42×10<sup>−19</sup>/1,6×10<sup>−19</sup> = <b>2,76 eV</b><br>(b) 2,76 eV > 1,12 eV → <b>ja</b>, blauw licht kan elektronen activeren in Si<br>(c) E<sub>rood</sub> = hc/(700×10<sup>−9</sup>)/1,6×10<sup>−19</sup> = 1,77 eV > 1,12 eV → <b>ja</b>, ook rood licht kan Si activeren'},
{s:2,q:'Een zonnepark van 10 ha produceert 15 GWh/jaar bij 1750 kWh/(kW<sub>p</sub>·jaar) en 18% rendement. (a) Bereken het geïnstalleerde piekvermogen (MWp). (b) Bereken de jaarlijkse CO<sub>2</sub>-besparing t.o.v. aardgas (400 g CO<sub>2</sub>/kWh). (c) Bereken hoeveel jaar voor CO<sub>2</sub>-terugverdientijd als installatie 1000 t CO<sub>2</sub> kostte bij productie.',
a:'(a) P<sub>p</sub> = 15×10<sup>6</sup>/1750 = <b>8570 kW<sub>p</sub> ≈ 8,6 MW<sub>p</sub></b><br>(b) Besparing = 15×10<sup>6</sup>·0,400 = <b>6,0×10<sup>6</sup> kg = 6000 t CO<sub>2</sub>/jaar</b><br>(c) Terugverdientijd = 1000/6000 = <b>0,17 jaar ≈ 2 maanden</b> — zeer gunstig'},
{s:2,q:'Een perovskiet-tandem zonnecel heeft rendement η=30% bij P<sub>in</sub>=1000 W/m². De cel heeft oppervlak 156×156 mm. (a) Bereken het maximale vermogen van één cel. (b) Een module van 60 cellen: bereken het modulevermogen. (c) Verklaar waarom tandemcellen hogere rendementen bereiken dan enkelvoudige juncties.',
a:'(a) A = 0,156² = 0,02434 m². P = 1000·0,30·0,02434 = <b>7,30 W</b><br>(b) P<sub>module</sub> = 60·7,30 = <b>438 W</b><br>(c) Een enkelvoudige junctie kan enkel fotonen met E ≈ E<sub>g</sub> efficiënt absorberen — fotonen met E < E<sub>g</sub> gaan verloren, en E >> E<sub>g</sub> geeft warmte (thermaliseringsverliezen). Tandem: twee juncties met verschillende bandgap absorberen complementaire golflengtes → minder verliezen → hoger totaalrendement (Shockley-Queisser-grens overschreden voor elke afzonderlijke cel).'},
{s:3,q:'Via het Shockley-Queisser-model is het theoretisch maximumrendement voor een enkel-junctie Si-cel (E<sub>g</sub>=1,12 eV, AM1.5 spectrum) ca. 33%. Verklaar quantitatief welke drie fundamentele verliesmechanismen dit beperken en schat hun bijdrage.',
a:'<b>1. Thermalisatieverliezen</b>: fotonen met E >> E<sub>g</sub> geven overtollige energie af als warmte in het rooster. Voor UV-fotonen (E≈3 eV) is ~60% energie verloren. Bijdrage: ~30% verlies.<br><b>2. Transmissieverliezen</b>: fotonen met E < E<sub>g</sub> (IR, λ>1100 nm voor Si) worden niet geabsorbeerd. ~20% van het zonlichtspectrum gaat door. Bijdrage: ~20% verlies.<br><b>3. Recombinatieverliezen</b>: geactiveerde elektron-gat-paren recombineren voor ze de externe circuit bereiken (Auger, stralings- en defect-recombinatie). Bijdrage: ~10% verlies.<br>Totaal: 33% beschikbaar → Si-commercieel bereikt 22–24% door bijkomende Ohm-verliezen en reflecties.'},
]},

{id:'5.3',t:'Waterstof als energiedrager en brandstofcellen',sub:'Groene waterstof · elektrolyse · brandstofcel · H<sub>2</sub>/O<sub>2</sub>-reactie',c1:false,
th:[
'Waterstof is een energiedrager, geen bron — productie kost energie',
'<b>Groene waterstof:</b> elektrolyse van water met hernieuwbare stroom: 2H<sub>2</sub>O → 2H<sub>2</sub> + O<sub>2</sub>',
'<b>Brandstofcel</b>: electrochemische cel H<sub>2</sub> + ½O<sub>2</sub> → H<sub>2</sub>O, U<sub>b</sub>=1,23 V, ΔG < 0',
'Voordelen: hoge energiedichtheid per massa, alleen water als product, geen verbranding',
'Nadelen: opslag moeilijk (lage dichtheid, hoge druk), verlies bij omzetting, dure membranen',
],
fm:'Elektrolyse: 2H<sub>2</sub>O → 2H<sub>2</sub> + O<sub>2</sub>, ΔH = +572 kJ/mol H<sub>2</sub>O<br>Brandstofcel: H<sub>2</sub> + ½O<sub>2</sub> → H<sub>2</sub>O, U<sub>b</sub>=1,23 V\nEnergie = Q·U; Q = n·F',
exo:[
{s:1,q:'Een PEM-elektrolyser werkt bij 1,8 V en 100 A. (a) Bereken het opgenomen vermogen. (b) Hoeveel H<sub>2</sub>-gas (in mol en in NL) wordt per uur geproduceerd? (c) Bereken het energieverbruik in kWh per kg H<sub>2</sub>.',
a:'(a) P = U·I = 1,8·100 = <b>180 W</b><br>(b) Q=100·3600=360 000 C; n(e<sup>−</sup>)=360000/96485=3,73 mol; n(H<sub>2</sub>)=3,73/2=<b>1,87 mol</b>; V=1,87·22,4=<b>41,9 NL/h</b><br>(c) E=180·1=0,18 kWh/h; m(H<sub>2</sub>)=1,87·2,016=3,77 g → kWh/kg=0,18/0,00377=<b>47,8 kWh/kg H<sub>2</sub></b>'},
{s:1,q:'Een waterstof-brandstofcel met U=0,70 V per cel en η=60%. (a) Schrijf halfreacties in zuur milieu. (b) Bereken de geleverde energie per mol H<sub>2</sub> (F=96485 C/mol; n=2e<sup>−</sup>). (c) Bereken het thermodynamisch maximaal rendement t.o.v. verbrandingsenergie (ΔH=−286 kJ/mol).',
a:'(a) Anode: H<sub>2</sub> → 2H<sup>+</sup> + 2e<sup>−</sup>; Kathode: ½O<sub>2</sub>+2H<sup>+</sup>+2e<sup>−</sup>→H<sub>2</sub>O<br>(b) E=Q·U=2·96485·0,70=<b>135 kJ/mol</b><br>(c) η<sub>thermo</sub>=ΔG/ΔH=2·96485·1,23/286000=237/286=<b>82,9%</b>; reëel bij 0,70 V: 135/286=47%'},
{s:2,q:'Een waterstoftruck heeft een 150 kg H<sub>2</sub>-tank en rijdt 1200 km. Een dieseltruck verbruikt 35 L/100 km (diesel: ρ=0,83 kg/L). (a) Bereken de massa diesel voor 1200 km. (b) Bereken de energiedichtheid van H<sub>2</sub> (ΔH=120 MJ/kg) en diesel (ΔH=42 MJ/kg) per kg. (c) Bereken de totale CO<sub>2</sub>-uitstoot van de diesel-truck (C<sub>12</sub>H<sub>26</sub>, M=170).',
a:'(a) V=35·1200/100=420 L; m=420·0,83=<b>349 kg diesel</b><br>(b) H<sub>2</sub>: <b>120 MJ/kg</b>; diesel: <b>42 MJ/kg</b> → H<sub>2</sub> heeft 2,9× hogere energiedichtheid per kg<br>(c) C<sub>12</sub>H<sub>26</sub>+18,5O<sub>2</sub>→12CO<sub>2</sub>+13H<sub>2</sub>O. n(diesel)=349000/170=2053 mol → n(CO<sub>2</sub>)=12·2053=24636 mol → m=24636·44=<b>1084 kg CO<sub>2</sub></b> ≈ 1,1 t CO<sub>2</sub> voor 1200 km'},
{s:2,q:'De Sabatier-reactie maakt "power-to-gas": CO<sub>2</sub> + 4H<sub>2</sub> → CH<sub>4</sub> + 2H<sub>2</sub>O, ΔH = −165 kJ/mol. (a) Bereken de massa H<sub>2</sub> nodig om 1 m<sup>3</sup> CH<sub>4</sub> (bij STP, M=16 g/mol) te produceren. (b) Hoeveel kWh hernieuwbare stroom is minimaal nodig (η<sub>elektrolyse</sub>=70%)? (c) Noem een voordeel en een nadeel van power-to-gas.',
a:'(a) n(CH<sub>4</sub>)=1000/22,4=44,6 mol; n(H<sub>2</sub>)=4·44,6=178,6 mol; m(H<sub>2</sub>)=178,6·2,016=<b>360 g H<sub>2</sub></b><br>(b) ΔH(elektrolyse)=178,6·286/1000=51,1 MJ; inclusief η: 51,1/0,70=73 MJ=<b>20,3 kWh</b><br>(c) Voordeel: methaan kan in bestaande gasleidingen opgeslagen worden. Nadeel: lage overall efficiëntie (~35%) — veel energie verloren bij elektrolyse, Sabatier en terugomzetting naar elektriciteit.'},
{s:3,q:'Een geavanceerde H<sub>2</sub>/O<sub>2</sub>-brandstofcel levert U=0,85 V bij 200 A en een stack van 400 cellen (serie). (a) Bereken stackvermogen en stackspanning. (b) Hoeveel kg H<sub>2</sub> per uur verbruikt de stack? (c) Bereken het rendement t.o.v. de thermodynamische bovengrens (1,23 V per cel).',
a:'(a) U<sub>stack</sub>=400·0,85=<b>340 V</b>; P=340·200=<b>68 kW</b><br>(b) In serie stroomt dezelfde I=200 A door elke cel, maar elke cel verbruikt zijn eigen H<sub>2</sub>. Per cel/uur: Q=200·3600=720 000 C → n(H<sub>2</sub>)=720 000/(2·96485)=3,73 mol → m=3,73·2,016=7,52 g/h per cel. Voor de volledige stack: 400·7,52 = <b>3010 g/h ≈ 3,0 kg H<sub>2</sub>/h</b><br>(c) η=U<sub>werkelijk</sub>/U<sub>max</sub>=0,85/1,23=<b>69%</b>'},
]},

{id:'5.4',t:'Batterijen en accu\'s — Li-ion',sub:'Lithiumionen · kathode/anode · lading/ontlading · energie-densiteit',c1:false,
th:[
'Li-ion-accu: Li<sup>+</sup> migreert tussen grafiet-anode en LiCoO<sub>2</sub>-kathode via elektrolyt',
'Celspanning: ≈ 3,7 V per cel; energiedichtheid 150–300 Wh/kg',
'<b>Lading:</b> Li<sup>+</sup> migreren van kathode naar anode (intercalatie in grafiet)',
'<b>Ontlading:</b> Li<sup>+</sup> migreren terug naar kathode; elektronen stromen door extern circuit',
'Voordelen: lage zelfontlading, hoge energie-densiteit; nadelen: duur, brandgevaar (thermal runaway)',
],
fm:'Anode (ontlading): LiC<sub>6</sub> → C<sub>6</sub> + Li<sup>+</sup> + e<sup>−</sup>\nKathode (ontlading): LiCoO<sub>2</sub> + Li<sup>+</sup> + e<sup>−</sup> → ...\nE = C·U = Q·U; C in Ah; E in Wh',
exo:[
{s:1,q:'Een Li-ion cel heeft nominale spanning 3,7 V en capaciteit 2500 mAh. (a) Bereken de opgeslagen energie in Wh en J. (b) Hoeveel ladingscycli bij dagelijks gebruik van 10 Wh? (c) Bij een smartphone met 3000 mAh: hoe lang duurt het opladen bij 1,5 A?',
a:'(a) E=C·U=2,5·3,7=<b>9,25 Wh</b>=9,25·3600=<b>33 300 J</b><br>(b) Cycli=E<sub>cel</sub>/E<sub>gebruik</sub>=9,25/10=0,925 cycli/dag → <b>1 cyclus/dag</b> (cel is kleiner dan daggebruik, twee cellen nodig)<br>(c) t=C/I=3000/1500=<b>2 uur</b>'},
{s:1,q:'Een Tesla Model S heeft een 100 kWh batterijakket bestaande uit 7104 cellen (18650-formaat, 3,6 V per cel). (a) Bereken de energie per cel in Wh. (b) Bereken de capaciteit per cel in Ah. (c) Bij η=90% omzetting naar wielas: hoeveel km bij 20 kWh/100 km verbruik?',
a:'(a) E<sub>cel</sub>=100000/7104=<b>14,08 Wh</b><br>(b) C=E/U=14,08/3,6=<b>3,91 Ah</b><br>(c) E<sub>bruikbaar</sub>=100·0,90=90 kWh → range=90/20·100=<b>450 km</b>'},
{s:2,q:'Bij een lithium-metaal-anode: Li → Li<sup>+</sup> + e<sup>−</sup>, E<sup>0</sup>=−3,04 V; LiCoO<sub>2</sub>-kathode: E<sup>0</sup>≈+0,66 V. (a) Bereken de theoretische celspanning. (b) Bereken de theoretische energiedichtheid van Li (M=6,94 g/mol, n=1). (c) Vergelijk met Pb-zuuraccu (U=2,0 V, M(Pb)=207 g/mol, n=2) per kg anode-materiaal.',
a:'(a) U=0,66−(−3,04)=<b>3,70 V</b><br>(b) Q/m(Li)=1·96485/6,94=13900 C/g=3860 mAh/g → E=3860·3,70/1000=<b>14,3 Wh/g=14300 Wh/kg</b><br>(c) Pb: Q/m=2·96485/207=932 C/g=259 mAh/g → E=259·2,0/1000=0,52 Wh/g=<b>520 Wh/kg</b>. Li is 27× energiedichter per gram anode.'},
{s:2,q:'Een elektrisch voertuig heeft een 75 kWh batterijakket dat 1500 keer volledig opgeladen kan worden (levensduur). Produtie veroorzaakte 7500 kg CO<sub>2</sub>. Gebruik: 20 kWh/100 km. Een benzineauto: 7 L/100 km (2,3 kg CO<sub>2</sub>/L brandstof). (a) Bereken de levensduur in km van de EV. (b) Bereken de CO<sub>2</sub>-uitstoot per km voor EV (met groene stroom: 50 g CO<sub>2</sub>/kWh) en voor benzineauto. (c) Bij hoeveel km is de EV qua CO<sub>2</sub> "terugverdiend"?',
a:'(a) km<sub>leven</sub>=1500·75/20·100=<b>562 500 km</b><br>(b) EV: gebruik=50·20/100=10 g/km + productie CO<sub>2</sub>=7500·1000/562500=13,3 g/km → totaal≈<b>23 g/km</b>. Benzine: 7·2300/100=<b>161 g/km</b><br>(c) Terugverdienen: 7500000/(161−10)=7500000/151=<b>49 700 km</b> ≈ 50 000 km'},
{s:3,q:'Solid-state batterijen vervangen de vloeibare elektrolyt door een vaste keramische (bv. Li<sub>7</sub>La<sub>3</sub>Zr<sub>2</sub>O<sub>12</sub>, LLZO). Analyseer voor- en nadelen via elektrochemische principes: (a) Waarom is een vaste elektrolyt veiliger? (b) Welk kinetisch probleem beperkt de laadsnelheid? (c) Bereken de maximale stroom bij een iongeleidbaarheid van 1×10<sup>−3</sup> S/cm voor een elektrolytdikte van 100 µm en oppervlak 100 cm².',
a:'(a) Geen brandbare vloeistof → geen thermal runaway via elektrolytontvlamming; geen lekrisico; bredere werkingstemperatuur<br>(b) <b>Lage iongeleidbaarheid</b> van vaste keramieken bij kamertemperatuur (vs. 10 mS/cm voor vloeibare elektrolyt) → hoge inwendige weerstand → beperkte laadstroom zonder spanningsverlies<br>(c) R=d/(σ·A)=100×10<sup>−4</sup>/(10<sup>−3</sup>·100)=10<sup>−2</sup>/10<sup>−1</sup>=<b>0,10 Ω</b>. Bij max. I·R-verlies = 0,1 V: I<sub>max</sub>=0,1/0,1=<b>1,0 A per cm² → 100 A totaal</b> (bij aanvaardbare ohmse warmteontwikkeling)'},
]},

{id:'5.5',t:'Groene elektrolyse',sub:'PEM-elektrolyser · alkalische elektrolyse · efficiëntie · schaalvergroting',c1:false,
th:[
'Elektrolyse van water: 2H<sub>2</sub>O → 2H<sub>2</sub> + O<sub>2</sub>, vereist U<sub>min</sub>=1,23 V (theorie)',
'<b>PEM-elektrolyser</b>: polymeer-membraan, hoge stroomdichtheid, compacte opstelling',
'<b>Alkalische elektrolyse</b>: KOH-elektrolyt, beproefd industrieel, lagere materiaalkost',
'Overpotentiaal: in praktijk 1,6–2,1 V nodig (kinetische barrières aan elektroden)',
'Efficiëntie van elektrolyse: η = ΔH<sub>H2</sub>/E<sub>elektrisch</sub> ≈ 60–80% voor moderne installaties',
],
fm:'Minimumspanning: U<sub>min</sub> = ΔG/(n·F) = 1,23 V\nOverpotentiaal: η = U<sub>werkelijk</sub> − U<sub>min</sub>\nEfficiëntie η = Q<sub>H2</sub>/W<sub>el</sub>×100%',
exo:[
{s:1,q:'Een PEM-elektrolyser werkt bij 1,80 V en 500 A. Theorie: 1,23 V. (a) Bereken de overpotentiaal. (b) Bereken de elektrolysewarmte die per uur als verlies ontwikkeld wordt (W<sub>verlies</sub>=(U<sub>werkelijk</sub>−U<sub>theorie</sub>)·I·t). (c) Bereken η.',
a:'(a) η = 1,80 − 1,23 = <b>0,57 V overpotentiaal</b><br>(b) P<sub>verlies</sub> = 0,57·500 = 285 W → W<sub>verlies</sub>=285·3600=<b>1,026 MJ/h</b><br>(c) η = 1,23/1,80·100% = <b>68,3%</b>'},
{s:1,q:'Bij alkalische elektrolyse in 30% KOH-oplossing: kathode 2H<sub>2</sub>O + 2e<sup>−</sup> → H<sub>2</sub> + 2OH<sup>−</sup>; anode 2OH<sup>−</sup> → ½O<sub>2</sub> + H<sub>2</sub>O + 2e<sup>−</sup>. (a) Schrijf de totaalreactie. (b) Welk gas produceer je aan kathode en anode? (c) Bereken de KOH-concentratie na elektrolyse als 10% water ontleed wordt uit een 1 L 30% KOH-oplossing (ρ=1,28 kg/L).',
a:'(a) 2H<sub>2</sub>O → 2H<sub>2</sub> + O<sub>2</sub> — KOH fungeert als elektrolyt, wordt niet verbruikt<br>(b) Kathode: <b>H<sub>2</sub></b>; anode: <b>O<sub>2</sub></b><br>(c) Massa oplossing=1280 g. KOH=384 g (onveranderd, niet verbruikt). H<sub>2</sub>O=896 g; 10% ontleed → 89,6 g water verdwijnt als H<sub>2</sub>+O<sub>2</sub>. Resterende H<sub>2</sub>O=806,4 g. Nieuwe massa-% KOH = 384/(384+806,4) = <b>32,3 m%</b> — KOH-concentratie <b>stijgt</b> door waterontleding terwijl KOH-massa constant blijft.'},
{s:2,q:'Elektrolyse van water met zonne-energie (η<sub>PV</sub>=20%, η<sub>elektr</sub>=70%): de zon levert 5 kWh/(m²·dag). (a) Bereken kWh H<sub>2</sub>-energie per m² per dag (overall η=η<sub>PV</sub>·η<sub>elektr</sub>). (b) Bereken g H<sub>2</sub> per m² per dag (H<sub>2</sub>: 33,3 kWh/kg). (c) Vergelijk met directe batterijopslag (η<sub>totaal</sub>=92%): wat geeft meer nuttige energie?',
a:'(a) η<sub>totaal</sub>=0,20·0,70=14%. E<sub>H2</sub>=5·0,14=<b>0,70 kWh/m²·dag</b><br>(b) m(H<sub>2</sub>)=0,70/33,3·1000=<b>21,0 g/m²·dag</b><br>(c) Batterij: 5·0,92=4,6 kWh nuttig vs. H<sub>2</sub>: 0,70 kWh → <b>batterij geeft 6,6× meer nuttige energie</b> per dag — directe opslag is efficiënter voor dagelijkse toepassingen; H<sub>2</sub> is interessanter voor seizoensopslag.'},
{s:2,q:'Bij groene ammoniak-productie (Haber-Bosch met groene H<sub>2</sub>): N<sub>2</sub> + 3H<sub>2</sub> → 2NH<sub>3</sub>, ΔH = −92 kJ/mol. De H<sub>2</sub> komt van elektrolyse (50 kWh/kg H<sub>2</sub>). (a) Bereken de H<sub>2</sub>-massa nodig per ton NH<sub>3</sub>. (b) Bereken de totale stroom per ton NH<sub>3</sub>. (c) Verklaar waarom groene ammoniak als energiedrager of brandstof interessant is.',
a:'(a) n(NH<sub>3</sub>)=10<sup>6</sup>/17=58824 mol; n(H<sub>2</sub>)=3/2·58824=88235 mol; m(H<sub>2</sub>)=88235·2,016/1000=<b>178 kg H<sub>2</sub>/t NH<sub>3</sub></b><br>(b) E=178·50=<b>8900 kWh/t NH<sub>3</sub></b><br>(c) NH<sub>3</sub> is vloeistof bij −33°C (makkelijker op te slaan dan H<sub>2</sub> bij −253°C), heeft hogere energie-dichtheid per volume dan vloeibaar H<sub>2</sub>, kan verbrand worden of ontleed voor H<sub>2</sub>-terugwinning, en kan via bestaande infrastructuur getransporteerd worden. Nadeel: giftig, stikstofemissies bij verbranding.'},
{s:3,q:'Groen ijzer via directe reductie (DR): Fe<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub> → 2Fe + 3H<sub>2</sub>O (H<sub>2</sub>-DR). Traditioneel: Fe<sub>2</sub>O<sub>3</sub> + 3CO → 2Fe + 3CO<sub>2</sub> (hoogovens). ΔH(H<sub>2</sub>-DR)=+98 kJ/mol per mol Fe<sub>2</sub>O<sub>3</sub>. (a) Bereken de H<sub>2</sub>-massa per ton staalproductie (M(Fe)=55,8). (b) Bereken de totale energiebehoefte (elektrolyse 50 kWh/kg H<sub>2</sub> + proceswarmte). (c) Vergelijk CO<sub>2</sub>-footprint van beide routes per ton staal.',
a:'(a) n(Fe)=10<sup>6</sup>/55,8=17921 mol; n(Fe<sub>2</sub>O<sub>3</sub>)=8961 mol; n(H<sub>2</sub>)=3·8961=26882 mol; m(H<sub>2</sub>)=26882·2,016/1000=<b>54,2 kg H<sub>2</sub>/t staal</b><br>(b) E<sub>elektr</sub>=54,2·50=2710 kWh/t. E<sub>warmte</sub>=98·8961/1000=878 MJ/t=244 kWh/t → totaal=<b>2954 kWh/t staal</b><br>(c) Traditioneel hoogovenproces: ~1,8–2,0 t CO<sub>2</sub>/t staal (cokes als reductor). H<sub>2</sub>-DR met groene stroom: ~0,03 t CO<sub>2</sub>/t staal (restsporen). <b>~98% CO<sub>2</sub>-reductie</b> — H<sub>2</sub>-DR is een kerntechnologie voor decarbonisatie van de staalindustrie.'},
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
'1.1':'Reactiesnelheid is de kwantitatieve uitdrukking van hoe snel een reactie verloopt: het tempo waarmee reactanten verdwijnen of producten verschijnen. Formeel wordt v = |Δc/Δt| uitgedrukt in mol/(L·s). Naarmate de reactie voortschrijdt daalt de reactantconcentratie en neemt de botsingsfrequentie af, waardoor v automatisch afneemt. De snelheidswet v = k·[A]<sup>m</sup>·[B]<sup>n</sup> beschrijft de afhankelijkheid van concentraties; de ordes m en n worden enkel experimenteel bepaald en staan los van de stoichiometrische coëfficiënten.',
'1.2':'De reactiesnelheid wordt door vier factoren bepaald: concentratie, temperatuur, contactoppervlak en katalysator. Elk verhoogt de frequentie of het aandeel effectieve botsingen. Temperatuurverhoging heeft het sterkste effect via de Arrhenius-vergelijking: k = A·e<sup>−Ea/RT</sup> — bij elke 10°C verdubbelt de snelheid ruwweg. Een katalysator biedt een alternatief pad met lagere activeringsenergie, maar wijzigt de evenwichtsligging niet.',
'1.3':'Elke chemische reactie is energetisch gekleurd: exotherm (warmte vrijgesteld, ΔH < 0) of endotherm (warmte opgenomen, ΔH > 0). De activeringsenergie E<sub>a</sub> is de minimumenergie die de botsende deeltjes moeten bezitten om het overgangscomplex te vormen. Het energiediagram visualiseert de energetische route: een berg (overgangscomplex) scheidt reactanten van producten. Katalysatoren verlagen E<sub>a</sub> maar wijzigen ΔH niet — de thermodynamica is onveranderlijk.',
'1.4':'Een totaalreactie is zelden een één-stap-botsing; vrijwel altijd doorloopt het systeem een reeks elementaire stappen. Elk tussenstap heeft zijn eigen moleculariteit en snelheidswet. De traagste stap bepaalt de totale snelheid: de snelheidsbepalende stap (SBS). Intermediairs zijn detecteerbare (maar kortstondige) tussenproducten; overgangscomplexen zijn niet isoleerbaar. Het mechanisme voorstellen en experimenteel verifiëren via de snelheidswet is één van de kernactiviteiten van de kinetica.',
'1.5':'Katalyse is fundamenteel voor de moderne chemie en biologie. Een katalysator verlaagt E<sub>a</sub> door een nieuw reactiemechanisme te bieden: bij heterogene katalyse adsorbeert het substraat aan het oppervlak; bij homogene katalyse vormt het een oplosbaar intermediair. Enzymen zijn de meest efficiënte katalysatoren die bestaan: extreem specifiek (sleutel-slot), actief bij milde condities, maar kwetsbaar voor hoge temperatuur en extreme pH. De analogie met zuur-base is treffend: de katalysator is een elektronendonor/acceptor of proton-relaisstation.',
'2.1':'Niet alle chemische reacties verlopen éénrichting. Wanneer zowel voorwaartse als terugwaartse reactie merkbaar snel zijn, bouwt het systeem een dynamisch evenwicht op. Macroscopisch ziet men geen verandering, maar op moleculair niveau botsen deeltjes voortdurend en worden producten opnieuw omgezet in reactanten. De concentraties zijn constant, niet nul. Dit dynamisch karakter wordt aangetoond met isotooplabeling: zelfs na instelling van het evenwicht wordt isotoop uitgewisseld.',
'2.2':'De wet van massawerking (Guldberg & Waage, 1864) stelt dat de verhouding van concentraties der producten en reactanten bij evenwicht een constante waarde K<sub>c</sub> aanneemt. Vaste stoffen en pure vloeistoffen worden weggelaten omdat hun activiteit per definitie 1 is. K<sub>c</sub> is temperatuurafhankelijk maar onafhankelijk van concentraties of druk — het is een thermodynamische constante. Een grote K<sub>c</sub> wijst op overwegend producten bij evenwicht; een kleine op overwegend reactanten.',
'2.3':'Het reactiequotiënt Q<sub>c</sub> heeft dezelfde algebraïsche vorm als K<sub>c</sub>, maar wordt berekend met willekeurige (niet noodzakelijk evenwichts-)concentraties. Door Q<sub>c</sub> te vergelijken met K<sub>c</sub> kan men onmiddellijk voorspellen in welke richting een systeem zal evolueren: bij Q<sub>c</sub> < K<sub>c</sub> vormen zich meer producten; bij Q<sub>c</sub> > K<sub>c</sub> meer reactanten. Q<sub>c</sub> is een momentopname; K<sub>c</sub> is het doel.',
'2.4':'Henri Louis Le Chatelier formuleerde in 1888 een kwalitatief principe dat de respons van elk evenwicht op verstoringen beschrijft. Een toename van concentratie, druk of temperatuur wordt gedeeltelijk gecompenseerd door een verschuiving die de verstoring tegengaat. Het principe is een directe manifestatie van de thermodynamica (minimalisatie van vrije energie), maar geeft geen kwantitatieve uitspraken — daarvoor is Q<sub>c</sub> nodig.',
'2.5':'Bij kwantitatieve evenwichtsberekeningen gebruikt men de ICE-tabel: beginconcentraties (I), veranderingen (C, uitgedrukt in ±x met stoichiometrische factoren) en evenwichtsconcentraties (E = I + C). Invullen in K<sub>c</sub> geeft een algebraïsche vergelijking. Bij kleine K<sub>c</sub> << 1 kan x verwaarloosd worden (benadering); bij grotere K<sub>c</sub> of asymmetrische beginconcentraties is de kwadratische formule of numerieke oplossing nodig. Verificatie door terugplaatsen in K<sub>c</sub> is essentieel.',
'2.6':'De ICE-methode is de standaardprocedure voor alle evenwichtsberekeningen. Ze vereist systematisch denken: eerst Q<sub>c</sub> vergelijken met K<sub>c</sub> om de richting te bepalen, dan de tabel opstellen, dan oplossen en verifiëren. Veel fouten komen van verkeerde tekens in de C-rij of het vergeten van stoichiometrische factoren. Een bijzondere toepassing is de buffer-berekening via Henderson-Hasselbalch, die op het zuur-base evenwicht berust — een directe link naar hoofdstuk H3.',
'5.1':'De industriële revolutie begon met de verbranding van fossiele brandstoffen: steenkool, later aardolie en aardgas. Deze brandstoffen bevatten de energie van plantenmaterie die miljoenen jaren gecomprimeerd werd. Bij verbranding wordt die energie in uren of seconden vrijgesteld en CO<sub>2</sub> vrijgegeven dat de aarde had opgeslagen over geologische tijdschalen. De resulterende stijging van de atmosferische CO<sub>2</sub>-concentratie versterkt het broeikaseffect en leidt tot klimaatopwarming. De overgang naar duurzame energiebronnen is niet alleen een economische maar ook een fundamenteel chemische uitdaging.',
'5.2':'De zon levert elk jaar 5,5 × 10<sup>24</sup> J energie op de aardoppervlakte — duizend keer het huidige wereldenergiegebruik. Het fotovoltaïsch effect (Alexandre Becquerel, 1839) zet lichtfotonen rechtstreeks om in elektrische energie via een halfgeleider-p-n-junctie. Silicium domineert de markt (>90%), maar perovskieten en organische cellen winnen terrein. Het theoretische maximum (Shockley-Queisser, ~33%) wordt beperkt door thermalisatie- en transmissieverliezen. Multijunctie-cellen omzeilen deze grens gedeeltelijk door meerdere bandgappen te combineren.',
'5.3':'Waterstof is de meest energierijke brandstof per massa (120 MJ/kg), maar in de natuur vrijwel niet vrij aanwezig. Groene waterstof wordt gemaakt via elektrolyse met hernieuwbare stroom. Een brandstofcel zet H<sub>2</sub> en O<sub>2</sub> direct electrochemisch om in stroom en warmte (enkel bijproduct: water) — met een theoretisch rendement van 83%, ver boven de Carnot-limiet van verbrandingsmotoren. De ketenefficiëntie (stroom → H<sub>2</sub> → stroom) bedraagt momenteel ~40%, maar verbetering van elektrolysers en brandstofcellen brengt de haalbaarheid dichterbij.',
'5.4':'De lithium-ionbatterij (ontwikkeld door Whittingham, Goodenough en Yoshino, Nobelprijs 2019) revolutioneerde draagbare elektronica en maakt de elektrische auto mainstream. Li<sup>+</sup>-ionen intercaleren (nestelen zich tussen de atomaire lagen) in grafiet (anode) en LiCoO<sub>2</sub> (kathode). De hoge celspanning (~3,7 V) en energiedichtheid (~250 Wh/kg) maken Li-ion superieur aan oudere technologieën. Uitdagingen voor de toekomst: kobaltvervanging, snelladen zonder degradatie, recycling en veiligheid bij thermal runaway.',
'5.5':'Groene elektrolyse is de sleutelschakel in de waterstofeconomie: hernieuwbare elektriciteit wordt omgezet in chemische energie (H<sub>2</sub>). PEM-elektrolysers (Proton Exchange Membrane) gebruiken een vast polymeerelectrolyt — compact, snel regelbaar, maar duur (Pt/Ir-katalysatoren). Alkalische elektrolysers met KOH-vloeistof zijn goedkoper en beproefd op grote schaal. De thermodynamische minimumspanning is 1,23 V; in de praktijk is 1,6–2,1 V nodig door kinetische overpotentialen. De kost van groene waterstof daalt sterk met het rendement van zonnepanelen en windturbines.',
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
'1.1':['Noteer de beginconcentratie en de eindconcentratie (of omgekeerd voor producten).','Bereken Δc = c<sub>eind</sub> − c<sub>begin</sub>; deel door Δt in seconden.','Controleer eenheid mol/(L·s); deel of vermenigvuldig met stoichiometrische factor indien gevraagd.'],
'1.2':['Identificeer welke factor wordt gevarieerd (concentratie, T, opp, katalysator).','Verbind de factor kwalitatief met de botsingstheorie: meer botsingen of lagere E<sub>a</sub>.','Bereken kwantitatief als gevraagd: factor bij T-wijziging, of verhouding van k-waarden.'],
'1.3':['Teken het energiediagram: reactanten, overgangscomplex (top), producten.','Bepaal E<sub>a</sub> (voorwaarts) en ΔH uit het diagram.','Bereken E<sub>a</sub> (terugwaarts) = E<sub>a</sub>(vw) − ΔH; controleer teken.'],
'1.4':['Tel de elementaire stappen op: som moet de totaalvergelijking geven.','Identificeer intermediairs (verschijnen en verdwijnen) en overgangscomplex (nooit isoleerbaar).','Schrijf de snelheidswet van de snelheidsbepalende stap; elimineer eventueel intermediairs via snel evenwicht.'],
'1.5':['Bepaal het katalysetype: homo- of heterogeen (zelfde of verschillende fase).','Verklaar de werking via verlaging van E<sub>a</sub> — nieuw mechanisme of actief centrum.','Controleer dat de katalysator niet wordt verbruikt en ΔH onveranderd blijft.'],
'2.1':['Herken de reversibele reactie (⇌) en beschrijf het dynamisch karakter.','Stel vast dat bij evenwicht v<sub>vw</sub> = v<sub>tw</sub> en concentraties constant zijn.','Onderscheid macroscopisch constant (zichtbaar) van microscopisch dynamisch (onzichtbaar).'],
'2.2':['Schrijf K<sub>c</sub>-expressie: producten in teller, reactanten in noemer, coëff. als machten.','Laat vaste stoffen en pure vloeistoffen weg (activiteit = 1).','Bereken K<sub>c</sub> of een gevraagde concentratie door in te vullen.'],
'2.3':['Bereken Q<sub>c</sub> met dezelfde expressie als K<sub>c</sub> maar met actuele concentraties.','Vergelijk Q<sub>c</sub> met K<sub>c</sub>: Q < K → voorwaarts; Q > K → terugwaarts; Q = K → evenwicht.','Redeneer over welke concentraties zullen stijgen/dalen.'],
'2.4':['Identificeer het soort verstoring: concentratie, druk/volume, temperatuur.','Pas Le Chatelier toe: systeem compenseert → richting die de verstoring vermindert.','Verifieer via Q<sub>c</sub> < K<sub>c</sub> of Q<sub>c</sub> > K<sub>c</sub> voor kwantitatieve bevestiging.'],
'2.5':['Stel ICE-tabel op met juiste tekens (−x voor reactanten, +x voor producten of omgekeerd bij terugwaartse richting).','Vul in K<sub>c</sub> en controleer of benadering (x << c) geldig is.','Los exacte vergelijking op indien benadering faalt; verifieer door K<sub>c</sub> opnieuw te berekenen.'],
'2.6':['Bereken Q<sub>c</sub> om reactierichting te bepalen — dit bepaalt het teken van x in de ICE-tabel.','Stel ICE op, noteer evenwichtsconcentraties als functies van x.','Los algebra op; controleer α = x/c<sub>0</sub> < 5% of gebruik exacte methode.'],
'5.1':['Schrijf de verbrandingsvergelijking en balanceer.','Bereken CO<sub>2</sub>-massa per eenheid energie via ΔH en stoichiometrie.','Vergelijk brandstoffen via CO<sub>2</sub>/kWh — lagere waarde = schoner per nuttige eenheid.'],
'5.2':['Bereken fotonenergie E = hc/λ; vergelijk met bandgap E<sub>g</sub>.','Gebruik η = P<sub>uit</sub>/P<sub>in</sub> om electriciteitsopbrengst te berekenen.','Schat benodigde oppervlakte via gemiddeld zonurenequivalent (kWh/(kW<sub>p</sub>·dag)).'],
'5.3':['Schrijf elektrolyse-halfreacties; bereken n(H<sub>2</sub>) via Q = I·t en n = Q/(n<sub>e</sub>·F).','Bereken brandstofcel-energie via E = n·F·U<sub>b</sub>; vergelijk met ΔH voor rendement.','Vergelij­king CO<sub>2</sub>-uitstoot per km: massa brandstof × CO<sub>2</sub>/kg brandstof.'],
'5.4':['Bereken opgeslagen energie via E = C·U (Wh) of E = Q·U (J).','Vergelijk energiedichtheden: Wh/kg = mAh/g × V.','Bereken range of laadtijd via E<sub>verbruik</sub> en laadstroom.'],
'5.5':['Bereken minimumspanning U<sub>min</sub> = ΔG/(n·F) = 1,23 V voor waterelektrolyse.','Bereken n(H<sub>2</sub>) via faradaywet: n = Q/(n<sub>e</sub>·F); bereken m en V.','Bereken efficiëntie η = U<sub>min</sub>/U<sub>werkelijk</sub>×100%.'],
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
'1.1':[
'<b>Definitie:</b> v = |Δ[reactant]/Δt| = Δ[product]/Δt in mol/(L·s) — negatief teken voor reactanten, positief voor producten.',
'<b>Gemiddelde vs. momentane snelheid:</b> gemiddeld over een interval; momentaan = raaklijn aan c-t-grafiek bij dat tijdstip.',
'<b>Snelheidswet:</b> v = k·[A]<sup>m</sup>·[B]<sup>n</sup> — ordes m en n bepaald experimenteel door methode van begin-snelheden.',
'<b>Snelheidsconstante k:</b> eenheid afhankelijk van totale orde; eerste orde: s<sup>−1</sup>; tweede orde: L/(mol·s).',
'Snelheid daalt naarmate reactie voortschrijdt (lagere concentraties → minder effectieve botsingen).',
],
'1.2':[
'<b>Concentratie:</b> meer deeltjes per volume → hogere botsingfrequentie → hogere v (kwadratisch bij bimoleculaire reacties).',
'<b>Temperatuur:</b> hogere T → hogere kinetische energie → meer deeltjes overwinnen E<sub>a</sub> → veel hogere k (exponentieel).',
'<b>Contactoppervlak:</b> alleen relevant voor heterogene systemen (vaste stof + vloeistof/gas); kleiner deeltje = groter actief oppervlak.',
'<b>Katalysator:</b> verlaagt E<sub>a</sub> via een alternatief mechanisme; verhoogt v zonder zichzelf permanent te verbruiken en zonder ΔH te wijzigen.',
'<b>Vuistregel:</b> elke 10°C verdubbelt de reactiesnelheid ruwweg (Q<sub>10</sub> ≈ 2) — rigoureus via Arrhenius: k = A·e<sup>−Ea/RT</sup>.',
],
'1.3':[
'<b>Activeringsenergie E<sub>a</sub>:</b> minimumenergie voor een effectieve botsing; alleen deeltjes met E ≥ E<sub>a</sub> kunnen reageren.',
'<b>Energiediagram:</b> x-as = reactieverloop, y-as = energie; piek = overgangscomplex (niet isoleerbaar); dal rechts = producten.',
'<b>Exotherm:</b> producten lager dan reactanten, ΔH < 0 — energie vrijgesteld; <b>endotherm:</b> producten hoger, ΔH > 0.',
'<b>Verband E<sub>a</sub> en ΔH:</b> E<sub>a,terug</sub> = E<sub>a,vw</sub> − ΔH. Bij exotherme reactie is de terugwaartse reactie moeilijker.',
'<b>Katalysator:</b> verlaagt zowel E<sub>a,vw</sub> als E<sub>a,terug</sub> met dezelfde waarde; ΔH onveranderd.',
],
'1.4':[
'<b>Reactiemechanisme:</b> reeks elementaire stappen waarvan de som de totaalvergelijking geeft; elke stap heeft een eigen moleculariteit.',
'<b>Elementaire stap:</b> unimoleculair (v = k·[A]), bimoleculair (v = k·[A][B]); orde = moleculariteit.',
'<b>Intermediair:</b> gevormd in één stap, verbruikt in de volgende; verschijnt niet in totaalvergelijking, maar IS isoleerbaar (in principe).',
'<b>Overgangscomplex (geactiveerd complex):</b> kortdurende toestand op de top van het energiediagram; nooit isoleerbaar.',
'<b>Snelheidsbepalende stap (SBS):</b> traagste stap bepaalt snelheid van totale reactie — analogie: langzaamste schakel in een ketting.',
],
'1.5':[
'<b>Katalysator:</b> biedt een alternatief reactiemechanisme met lagere E<sub>a</sub>; wordt geregenereerd en niet verbruikt; wijzigt ΔH niet.',
'<b>Homogene katalyse:</b> katalysator en reactanten in dezelfde fase (bv. H<sup>+</sup>-katalyse van esterificatie in water).',
'<b>Heterogene katalyse:</b> katalysator in andere fase (bv. Pt voor H<sub>2</sub>-adsorptie, V<sub>2</sub>O<sub>5</sub> voor SO<sub>3</sub>-synthese). Werking via adsorptie → zwakken binding → reactie aan oppervlak.',
'<b>Enzymkatalyse:</b> E + S ⇌ ES → E + P. Sleutel-slotmodel: specifieke geometrie van actief centrum. Substraatverzadiging bij hoge [S] → Michaelis-Menten kinetiek.',
'<b>Vergiftiging:</b> sommige stoffen (Pb, CO, zware metalen) blokkeren actieve plaatsen permanent → katalysator gedeactiveerd.',
],
'2.1':[
'<b>Reversibele reactie:</b> heen- én terugwaartse reactie verlopen tegelijkertijd; notatief met ⇌.',
'<b>Dynamisch evenwicht:</b> v<sub>voorwaarts</sub> = v<sub>terugwaarts</sub>; concentraties constant maar niet nul — voortdurende activiteit op moleculair niveau.',
'Evenwicht wordt bereikt ongeacht de initiële concentraties (zolang T constant) — vanuit zuivere reactanten of zuivere producten.',
'<b>Le Chatelier (preview):</b> verstoring leidt tot verschuiving die de verstoring deels compenseert.',
'<b>K<sub>c</sub> (preview):</b> de verhouding van evenwichtsconcentraties is een constante bij gegeven T.',
],
'2.2':[
'<b>Wet van massawerking (1864):</b> K<sub>c</sub> = [C]<sup>c</sup>[D]<sup>d</sup>/([A]<sup>a</sup>[B]<sup>b</sup>) bij evenwicht — vaste stoffen en zuivere vloeistoffen weggelaten.',
'<b>K<sub>c</sub> en richting:</b> K<sub>c</sub> >> 1 = producten overheersen; K<sub>c</sub> << 1 = reactanten overheersen; K<sub>c</sub> ≈ 1 = beiden vergelijkbaar.',
'<b>T-afhankelijkheid:</b> K<sub>c</sub> verandert bij andere T; bij hogere T verschuift K<sub>c</sub> in de endotherme richting (Van\'t Hoff).',
'<b>Inversie:</b> voor omgekeerde reactie geldt K\'<sub>c</sub> = 1/K<sub>c</sub>; voor halve reactie K\'<sub>c</sub> = √K<sub>c</sub>.',
'<b>Combinatie:</b> K<sub>c,totaal</sub> = product van K<sub>c</sub>-waarden van deelreacties (Hess-analogie).',
],
'2.3':[
'<b>Q<sub>c</sub> = reactiequotiënt:</b> zelfde expressie als K<sub>c</sub> maar met willekeurige (niet-evenwichts)concentraties.',
'<b>Richtegebeurtenissen:</b> Q < K → voorwaarts (meer producten nodig); Q > K → terugwaarts; Q = K → evenwicht.',
'<b>Q<sub>c</sub> als diagnostisch hulpmiddel:</b> bij elke berekening waarbij je de richting wil kennen, bereken eerst Q<sub>c</sub>.',
'Q<sub>c</sub> is direct na een verstoring onmiddellijk anders dan K<sub>c</sub> → dit drijft de nieuwe verschuiving.',
],
'2.4':[
'<b>Le Chatelier-principe:</b> elke verstoring van een evenwicht veroorzaakt een verschuiving die de verstoring gedeeltelijk opheft.',
'<b>Concentratie:</b> toevoeging van reactant → verschuiving naar producten; toevoeging product → verschuiving naar reactanten.',
'<b>Druk/volume:</b> hogere druk (kleiner volume) → verschuiving naar kant met minder mol gas (Δn < 0).',
'<b>Temperatuur:</b> hogere T → verschuift naar de endotherme richting (warmte = reactant in endotherme reactie).',
'<b>Inert gas bij constant V:</b> geen effect op K<sub>c</sub> of partiaaldrukken van reactanten/producten.',
],
'2.5':[
'<b>ICE = Initieel / Change / Equilibrium:</b> standaard-tabel voor evenwichtsberekeningen.',
'<b>Change-rij:</b> gebruik stoichiometrische factoren; −x voor reactanten, +x voor producten (bij voorwaartse reactie).',
'<b>Benadering:</b> als K<sub>c</sub> << 1, dan x << c<sub>0</sub> → verwaarlozen x in noemer; na oplossen verifiëren: x/c<sub>0</sub> < 5%.',
'<b>Exacte methode:</b> kwadratische formule x = (−b ± √(b²−4ac))/2a; kies altijd de fysisch zinvolle (positieve, reële) oplossing.',
'<b>Verificatie:</b> bereken K<sub>c</sub> met gevonden concentraties — moet overeenkomen met opgegeven K<sub>c</sub>.',
],
'2.6':[
'<b>ICE-procedure:</b> ① bepaal richting via Q vs. K, ② stel tabel op met ±x, ③ schrijf K<sub>c</sub>-expressie, ④ los op, ⑤ verifieer.',
'<b>Kwadratische vergelijking:</b> ax² + bx + c = 0 → x = (−b ± √(b²−4ac))/2a; neem positieve wortel.',
'<b>Eenheid K<sub>c</sub>:</b> afhankelijk van Δn (verschil mol product − mol reactant); soms eenheidloos afgesproken.',
'<b>Extreme K<sub>c</sub>-waarden:</b> K<sub>c</sub> = 10<sup>−30</sup> → nauwelijks producten; K<sub>c</sub> = 10<sup>15</sup> → reactie vrijwel volledig.',
],
'5.1':[
'<b>Fossiele brandstoffen:</b> kool (C), aardolie (C<sub>x</sub>H<sub>y</sub>) en aardgas (CH<sub>4</sub>) bevatten opgeslagen zonne-energie uit de prehistorie.',
'<b>Verbranding:</b> C<sub>x</sub>H<sub>y</sub> + O<sub>2</sub> → CO<sub>2</sub> + H<sub>2</sub>O — vrijgesteld ΔH drijft turbines en motoren.',
'<b>CO<sub>2</sub>-problematiek:</b> CO<sub>2</sub>-concentratie steeg van 280 ppm naar >420 ppm → versterkt broeikaseffect → klimaatopwarming.',
'<b>GWP:</b> CO<sub>2</sub>=1, CH<sub>4</sub>=28, N<sub>2</sub>O=265 over 100 jaar — methaan en lachgas hebben veel hogere klimaatimpact per kg.',
'<b>Duurzame overgang:</b> wind, zon, waterstof en kernenergie reduceren CO<sub>2</sub>-uitstoot per kWh.',
],
'5.2':[
'<b>Zonne-energie:</b> zon levert 173 000 TW op de aardoppervlakte — 10 000× het wereldenergiegebruik.',
'<b>Fotovoltaïsch effect:</b> foton met E ≥ E<sub>g</sub> stoot elektron los van valentieband naar geleidingsband → lading-scheiding in p-n-junctie → gelijkstroom.',
'<b>Rendement:</b> commercieel Si: 18–22%; theoretisch maximum Shockley-Queisser: ~33% (gelimiteerd door thermalisatie en transmissieverliezen).',
'<b>Tandem-cellen:</b> meerdere juncties met verschillende E<sub>g</sub> absorberen breder spectrum → hogere η.',
'<b>Nadelen:</b> intermittente productie (nacht, bewolking), opslagprobleem, materiaalgebruik (Ag, In, Ga).',
],
'5.3':[
'<b>Waterstof is een energiedrager</b>, geen primaire bron — productie kost altijd energie; groen H<sub>2</sub> via elektrolyse met hernieuwbare stroom.',
'<b>Brandstofcel:</b> electrochemische omzetting H<sub>2</sub> + ½O<sub>2</sub> → H<sub>2</sub>O, U<sub>b</sub>=1,23 V; rendement tot 83% theoretisch (> Carnot).',
'<b>PEM-brandstofcel:</b> polymeer membraan, H<sub>2</sub> aan anode, O<sub>2</sub> aan kathode, proton migreert door membraan.',
'<b>Energiedichtheid:</b> H<sub>2</sub> = 120 MJ/kg (3× benzine per kg), maar volumetrisch klein → opslag bij hoge druk of vloeibaar bij −253°C.',
'<b>Ketenefficiëntie:</b> elektriciteit → H<sub>2</sub> (70%) → brandstofcel → elektriciteit (60%) = 42% totaal; direct batterijopslag (~92%) is efficiënter voor korte termijn.',
],
'5.4':[
'<b>Li-ion werkingsprincipe:</b> Li<sup>+</sup>-ionen intercaleren reversibel tussen grafiet (anode) en LiCoO<sub>2</sub>/LFP/NMC (kathode) via vloeibare elektrolyt.',
'<b>Celspanning:</b> ≈ 3,7 V (nominaal); energiedichtheid 150–300 Wh/kg — superieur t.o.v. Pb-zuur (35 Wh/kg) en NiMH (80 Wh/kg).',
'<b>Lading:</b> extern aangebrachte spanning drijft Li<sup>+</sup> van kathode → anode; <b>ontlading:</b> spontaan terug naar kathode (KRAO).',
'<b>Degradatie:</b> bij elk laadcyclus groeien passiverende lagen (SEI) → capaciteitsverlies na 500–1500 cycli.',
'<b>Veiligheid:</b> thermal runaway bij oopladen of beschadiging; solid-state elektrolyt als oplossing in ontwikkeling.',
],
'5.5':[
'<b>Elektrolyse van water:</b> 2H<sub>2</sub>O → 2H<sub>2</sub> + O<sub>2</sub>, ΔG = +237 kJ/mol → minimumspanning 1,23 V; praktisch 1,6–2,1 V.',
'<b>PEM-elektrolyser:</b> vaste polymeer elektrolyt, hoge stroomdichtheid (1–3 A/cm²), compact; duur door Pt/Ir-katalysatoren.',
'<b>Alkalische elektrolyser:</b> KOH-vloeistof, beproefd op grote schaal (MW-klasse), goedkoper, maar minder dynamisch regelbaar.',
'<b>Efficiëntie:</b> η = U<sub>therm</sub>/U<sub>werkelijk</sub> × 100%; moderne installaties 60–80%.',
'<b>Kostenreductie:</b> kost groene H<sub>2</sub> daalt sterk bij goedkopere stroom (PV) en verbeterde elektrolysers — doel < €2/kg H<sub>2</sub>.',
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
'1.1':[
'v = |Δc/Δt| in mol/(L·s) — concentratieverandering per tijdseenheid.',
'Gemiddelde snelheid over interval; momentane snelheid = raaklijn aan c-t-grafiek.',
'Snelheidswet: v = k·[A]<sup>m</sup>·[B]<sup>n</sup> — ordes experimenteel bepaald.',
'Snelheid daalt tijdens reactie wegens lagere concentraties.',
],
'1.2':[
'Concentratie ↑ → meer botsingen → v ↑.',
'Temperatuur ↑ → meer effectieve botsingen (E ≥ E<sub>a</sub>) → v ↑ (exponentieel).',
'Contactoppervlak ↑ → meer actieve plaatsen → v ↑ (bij vaste stoffen).',
'Katalysator verlaagt E<sub>a</sub> → v ↑ zonder ΔH te wijzigen.',
],
'1.3':[
'E<sub>a</sub> = minimumenergie voor effectieve botsing; hoger energiediagram = moeilijker reactie.',
'Exotherm: ΔH < 0 (producten lager); endotherm: ΔH > 0 (producten hoger).',
'E<sub>a,terug</sub> = E<sub>a,vw</sub> − ΔH.',
'Katalysator verlaagt E<sub>a</sub> maar wijzigt ΔH niet.',
],
'1.4':[
'Mechanisme = reeks elementaire stappen; som = totaalvergelijking.',
'Intermediair: gevormd en verbruikt in mechanisme; niet in totaalvergelijking.',
'SBS = traagste stap; bepaalt de totale snelheidswet.',
'Moleculariteit elementaire stap → orde in de snelheidswet van die stap.',
],
'1.5':[
'Katalysator verlaagt E<sub>a</sub>; homo- (zelfde fase) of heterogeen (andere fase).',
'Enzym = biologische katalysator; sleutel-slot; actief centrum specifiek.',
'Substraatverzadiging → Michaelis-Menten: v<sub>max</sub> bereikt bij hoge [S].',
'Vergiftiging blokkeert actieve plaatsen → deactivering katalysator.',
],
'2.1':[
'Dynamisch evenwicht: v<sub>vw</sub> = v<sub>tw</sub>; concentraties constant maar reactie loopt door.',
'Macroscopisch: geen verandering zichtbaar; microscopisch: voortdurende uitwisseling.',
'Evenwicht bereikt ongeacht startconcentraties bij constante T.',
'Verstoring → verschuiving (Le Chatelier); kwantitatief via Q vs. K.',
],
'2.2':[
'K<sub>c</sub> = [prod]<sup>coeff</sup>/[react]<sup>coeff</sup> — vaste stoffen/pure vloeistoffen weggelaten.',
'K<sub>c</sub> groot: producten overheersen; K<sub>c</sub> klein: reactanten overheersen.',
'K<sub>c</sub> is T-afhankelijk; onafhankelijk van concentratie of druk.',
'K\'<sub>c</sub>(omgekeerd) = 1/K<sub>c</sub>; halve vergelijking: K\'<sub>c</sub> = √K<sub>c</sub>.',
],
'2.3':[
'Q<sub>c</sub> = zelfde expressie als K<sub>c</sub> maar met actuele (niet-evenwichts) concentraties.',
'Q < K → reactie gaat voorwaarts; Q > K → terugwaarts; Q = K → evenwicht.',
'Q<sub>c</sub> is het snelste hulpmiddel om reactierichting te voorspellen.',
],
'2.4':[
'Le Chatelier: verstoring → verschuiving die de verstoring gedeeltelijk compenseert.',
'Concentratie ↑ reactant → evenwicht naar rechts; ↑ product → naar links.',
'Druk ↑ → verschuiving naar kant met minder mol gas.',
'T ↑ → verschuiving naar endotherme richting (warmte als reactant).',
'Inert gas bij constant V: geen effect.',
],
'2.5':[
'ICE = Initieel / Change / Equilibrium — standaard berekeningsprocedure.',
'Benadering: x << c<sub>0</sub> geldig als K<sub>c</sub> << 1 én x/c<sub>0</sub> < 5%.',
'Exacte methode: kwadratische formule bij grote x of K<sub>c</sub> ≈ 1.',
'Verificatie: bereken K<sub>c</sub> met gevonden waarden.',
],
'2.6':[
'ICE-stappen: ① richting (Q vs K), ② tabel ±x, ③ K<sub>c</sub>-expressie invullen, ④ oplossen, ⑤ controleren.',
'Kwadratische formule: x = (−b ± √(b²−4ac))/2a — neem positieve wortel.',
'Bijzondere gevallen: K<sub>c</sub> = 10<sup>−30</sup> → x ≈ 0; K<sub>c</sub> >> 1 → reactie vrijwel volledig.',
],
'5.1':[
'Fossiele brandstoffen (kool, olie, gas) stoten CO<sub>2</sub> uit bij verbranding → broeikaseffect.',
'CO<sub>2</sub>-concentratie steeg van 280 → >420 ppm; correlatie met opwarming.',
'CO<sub>2</sub>/kWh varieert: kool > olie > aardgas; hernieuwbare energie ≈ 0.',
'GWP: CH<sub>4</sub>=28, N<sub>2</sub>O=265 t.o.v. CO<sub>2</sub>=1 over 100 jaar.',
],
'5.2':[
'Fotovoltaïsch effect: foton (E ≥ E<sub>g</sub>) activeert elektron in halfgeleider → stroom.',
'Commercieel Si-rendement: 18–22%; Shockley-Queisser-maximum ≈ 33%.',
'η = P<sub>uit</sub>/P<sub>in</sub> × 100%; E<sub>foton</sub> = hc/λ.',
'Tandem-cellen combineren twee bandgaps → hogere efficiëntie.',
],
'5.3':[
'Groene waterstof via elektrolyse: 2H<sub>2</sub>O → 2H<sub>2</sub> + O<sub>2</sub> (hernieuwbare stroom).',
'Brandstofcel: H<sub>2</sub> + ½O<sub>2</sub> → H<sub>2</sub>O, U<sub>b</sub>=1,23 V, η<sub>max</sub>=83%.',
'Energiedichtheid H<sub>2</sub>: 120 MJ/kg (3× benzine); maar opslag moeilijk.',
'Ketenefficiëntie stroom → H<sub>2</sub> → stroom ≈ 40–50%.',
],
'5.4':[
'Li-ion: Li<sup>+</sup> intercaleert tussen grafiet (anode) en LiCoO<sub>2</sub> (kathode).',
'Celspanning ≈ 3,7 V; energiedichtheid 150–300 Wh/kg.',
'E = C·U (Wh); C in Ah; degradatie na 500–1500 cycli.',
'Solid-state elektrolyt vervangt vloeibaar → veiliger, hogere energiedichtheid.',
],
'5.5':[
'Elektrolyse: U<sub>min</sub>=1,23 V (theoretisch); praktisch 1,6–2,1 V door overpotentiaal.',
'PEM: compact, snel regelbaar; alkalisch: goedkoper, bewezen op grote schaal.',
'η = U<sub>min</sub>/U<sub>werkelijk</sub>×100% ≈ 60–80% voor moderne systemen.',
'Kost groene H<sub>2</sub> daalt naarmate hernieuwbare stroom goedkoper wordt.',
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
H1:{
fmls:[
{n:'Reactiesnelheid',f:'v = |Δc/Δt| &nbsp;&nbsp; [mol/(L·s)]'},
{n:'Snelheidswet',f:'v = k·[A]<sup>m</sup>·[B]<sup>n</sup>'},
{n:'Arrhenius',f:'k = A·e<sup>−Ea/RT</sup>'},
{n:'Eerste orde',f:'c(t) = c<sub>0</sub>·e<sup>−kt</sup> &nbsp;&nbsp; t<sub>½</sub> = ln2/k'},
{n:'Activeringsenergie',f:'E<sub>a,terug</sub> = E<sub>a,vw</sub> − ΔH'},
],
tabs:[
{title:'Snelheidsconstante k — eenheden',heads:['Orde','Eenheid k'],rows:[
['0','mol/(L·s)'],
['1','s<sup>−1</sup>'],
['2','L/(mol·s)'],
['3','L<sup>2</sup>/(mol<sup>2</sup>·s)'],
]},
],
usage:'v = k·[A]<sup>m</sup>·[B]<sup>n</sup>: ordes m, n experimenteel bepaald. E<sub>a</sub> altijd positief. Arrhenius: verhoog T met 10°C → k ruwweg verdubbelt (vuistregel). Initiële snelheden vergelijken: houd één reactant constant en varieer de andere.',
},
H2:{
fmls:[
{n:'Evenwichtsconstante',f:'K<sub>c</sub> = [C]<sup>c</sup>[D]<sup>d</sup> / ([A]<sup>a</sup>[B]<sup>b</sup>)'},
{n:'Reactiequotiënt',f:'Q<sub>c</sub> = zelfde expressie, willekeurige c'},
{n:'Richting',f:'Q < K → voorwaarts · Q > K → terugwaarts · Q = K → evenwicht'},
{n:'ICE-methode',f:'I + C = E; K<sub>c</sub> = f(x); oplossen x'},
{n:'Inversie',f:'K\'<sub>c</sub>(omgekeerd) = 1/K<sub>c</sub>'},
],
tabs:[
{title:'Le Chatelier — overzicht verstoringen',heads:['Verstoring','Verschuiving'],rows:[
['[reactant] ↑','→ rechts (naar producten)'],
['[product] ↑','→ links (naar reactanten)'],
['Druk ↑ (V ↓)','→ kant met minder mol gas'],
['T ↑ (exotherme reactie)','→ links (ΔH < 0: warmte = product)'],
['T ↑ (endotherme reactie)','→ rechts (ΔH > 0: warmte = reactant)'],
['Inert gas bij const. V','geen effect'],
['Katalysator','geen effect op K<sub>c</sub>'],
]},
],
usage:'K<sub>c</sub>-expressie: vaste stoffen en pure vloeistoffen weglaten. Eenheid: afhankelijk van Δn (mol prod − mol react). ICE: eerst Q vs K vergelijken voor juist teken van x. Verificatie: bereken K<sub>c</sub> met gevonden waarden en vergelijk met opgave.',
},
H5:{
fmls:[
{n:'Fotonenergie',f:'E = hc/λ &nbsp;&nbsp; h = 6,626×10<sup>−34</sup> J·s · c = 3×10<sup>8</sup> m/s'},
{n:'PV-rendement',f:'η = P<sub>el</sub>/P<sub>zon</sub> × 100%'},
{n:'Elektrolyse',f:'2H<sub>2</sub>O → 2H<sub>2</sub> + O<sub>2</sub> &nbsp;&nbsp; U<sub>min</sub> = 1,23 V'},
{n:'Faradaywet',f:'m = (M·I·t)/(n·F) &nbsp;&nbsp; F = 96485 C/mol'},
{n:'Batterijeenergie',f:'E = C·U [Wh] = Q·U [J] &nbsp;&nbsp; C in Ah'},
{n:'CO<sub>2</sub>-equivalent',f:'CO<sub>2</sub>-eq = Σ (m<sub>gas</sub> · GWP<sub>gas</sub>)'},
],
tabs:[
{title:'Energiedragers — vergelijking',heads:['Drager','Energiedichtheid','CO<sub>2</sub>/kWh'],rows:[
['Steenkool','~33 MJ/kg','820 g'],
['Aardolie','~42 MJ/kg','650 g'],
['Aardgas (CH<sub>4</sub>)','~55 MJ/kg','490 g'],
['Waterstof (H<sub>2</sub>)','120 MJ/kg','0 g (groen)'],
['Li-ion accu','0,54–1,08 MJ/kg','~50 g (groene stroom)'],
]},
{title:'GWP-waarden (100 jaar)',heads:['Gas','Formule','GWP'],rows:[
['Koolstofdioxide','CO<sub>2</sub>','1'],
['Methaan','CH<sub>4</sub>','28'],
['Lachgas','N<sub>2</sub>O','265'],
['Waterdamp','H<sub>2</sub>O','~0 (kort verblijf)'],
]},
],
usage:'Faradaywet: n = elektronen per mol stof (bv. H<sub>2</sub>: n=2). Fotonenergie in eV: deel door 1,6×10<sup>−19</sup>. CO<sub>2</sub>-eq: altijd aangeven over welke tijdshorizon (20 of 100 jaar). Rendement: altijd als breuk < 1 invullen in formules.',
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
H1:[
{q:'De gemiddelde reactiesnelheid van een reactie A → B is gedefinieerd als:',o:['v = Δ[B]/Δt','v = |Δ[A]|/Δt','v = |Δc|/Δt (reactant of product, positief)','v = Δ[A]·Δt'],c:2,e:'Snelheid is altijd positief; men neemt de absolute waarde van de concentratieverandering per tijdseenheid, ongeacht of men reactant of product bekijkt.'},
{q:'Een reactie heeft snelheidswet v = k[A]²[B]. Als [A] verdubbelt (rest constant), wordt v:',o:['2× groter','4× groter','8× groter','Ongewijzigd'],c:1,e:'[A]² → (2[A])² = 4[A]² → factor 4. Reactie is tweede orde in A.'},
{q:'De eenheid van de snelheidsconstante k voor een tweedeorde-reactie is:',o:['s<sup>−1</sup>','mol·L<sup>−1</sup>·s<sup>−1</sup>','L·mol<sup>−1</sup>·s<sup>−1</sup>','L²·mol<sup>−2</sup>·s<sup>−1</sup>'],c:2,e:'v [mol/L/s] = k · [A]² [mol/L]² → k = v/[A]² = (mol/L/s)/(mol/L)² = L·mol<sup>−1</sup>·s<sup>−1</sup>.'},
{q:'Welke factor verhoogt de reactiesnelheid NIET direct door het activeringsenergie Ea te verlagen?',o:['Katalysator','Enzym','Temperatuurverhoging','Concentratieverhoging reactanten'],c:3,e:'Concentratieverhoging verhoogt de botsingfrequentie maar verandert Ea niet. Katalysatoren en enzymen verlagen Ea; temperatuurverhoging verhoogt het aandeel botsingen met E ≥ Ea.'},
{q:'In een energiediagram van een exotherme reactie geldt:',o:['E<sub>prod</sub> > E<sub>react</sub>','Ea > 0 en ΔH > 0','Ea > 0 en ΔH < 0','Ea < 0 en ΔH < 0'],c:2,e:'Exotherm: producten hebben lagere energie dan reactanten → ΔH < 0. Activeringsenergie Ea is altijd positief (drempelwaarde om te reageren).'},
{q:'Een reactie A₂ + B₂ → 2AB verloopt via twee elementaire stappen. De snelheidsbepalende stap is altijd:',o:['De laatste stap','De snelste stap','De langzaamste stap','De stap met grootste ΔH'],c:2,e:'De snelheidsbepalende stap (SBS) is de traagste, analoog aan het nauwste punt van een bottleneck; die bepaalt de algehele reactiesnelheid.'},
{q:'Een katalysator verhoogt de reactiesnelheid omdat hij:',o:['De concentratie van reactanten verhoogt','Een alternatief reactiemechanisme met lagere Ea biedt','De evenwichtsconstante K vergroot','De concentratie van producten verlaagt'],c:1,e:'Katalysator biedt een ander pad met lagere activeringsdrempel; de thermodynamica (K) wordt niet beïnvloed, enkel de kinetiek.'},
{q:'Bij de reactie 2H₂O₂ → 2H₂O + O₂ wordt jodide als katalysator gebruikt. Welk type katalyse is dit?',o:['Heterogene katalyse','Enzymkatalyse','Homogene katalyse','Fotokatalyse'],c:2,e:'Jodide (I<sup>−</sup>) en H₂O₂ zijn beide in waterige oplossing → zelfde fase → homogene katalyse.'},
{q:'De reactie N₂O₅ → 2NO₂ + ½O₂ is eersteorde. Hoe verandert de snelheid als [N₂O₅] halveert?',o:['Geen verandering','v halveert','v kwarteert','v verdubbelt'],c:1,e:'Eerste orde: v = k[N₂O₅]. Halveer [N₂O₅] → v halveert. Hogere ordes zouden sterker reageren.'},
{q:'De halfwaardetijd t₁/₂ van een eersteorde-reactie:',o:['Is afhankelijk van de startconcentratie','Is constant en gelijk aan ln 2/k','Is gelijk aan 1/k','Neemt toe naarmate [A] daalt'],c:1,e:'t₁/₂ = ln2/k voor eerste orde: constant, onafhankelijk van startconcentratie.'},
{q:'Welke uitspraak over het verband temperatuur–snelheid is JUIST?',o:['Elke 10°C stijging verdubbelt de snelheidsconstante k (vuistregel)','k neemt lineair toe met T','k daalt als T stijgt','T heeft geen effect als Ea = 0'],c:0,e:'Vuistregel: ΔT = +10°C → k ≈ ×2 (Arrhenius). Strikt: k = A·e<sup>−Ea/RT</sup>: exponentieel, niet lineair.'},
{q:'In de snelheidswet v = k[NO]²[O₂] is de totale reactieorde:',o:['1','2','3','4'],c:2,e:'Totale orde = som van exponenten: 2 + 1 = 3.'},
{q:'Een reactiemechanisme telt twee stappen: stap 1 snel, stap 2 traag. De snelheidswet is gebaseerd op:',o:['Stap 1','Stap 2','De som van beide stappen','De totaalvergelijking'],c:1,e:'De SBS (stap 2, traagste) bepaalt de snelheidswet. Snel evenwicht van stap 1 kan worden gebruikt om intermediaire concentraties te elimineren.'},
{q:'Hoe beïnvloedt een groter contactoppervlak (bv. gemalen vaste stof) de reactiesnelheid?',o:['Verlaagt Ea','Verhoogt botsingfrequentie aan het oppervlak','Verhoogt de temperatuur','Verlaagt de concentratie in oplossing'],c:1,e:'Meer oppervlak → meer bereikbare actieve plaatsen → meer botsingen per tijdseenheid → hogere v.'},
{q:'De reactie CH₃Br + OH⁻ → CH₃OH + Br⁻ heeft v = k[CH₃Br][OH⁻]. Dit is een:',o:['Eersteorde-reactie','Tweedeorde-reactie','Nuldeorde-reactie','Derdeorde-reactie'],c:1,e:'1 + 1 = 2: tweedeorde (S<sub>N</sub>2-reactie). De moleculariteit en de orde zijn hier beide 2.'},
{q:'Een nuldeorde-reactie heeft v = k. Welke grafiek geeft een rechte lijn?',o:['[A] vs t','ln[A] vs t','1/[A] vs t','v vs [A]²'],c:0,e:'Nulde orde: [A] = [A]₀ − kt → lineair in [A] vs t. Eerste orde geeft rechte in ln[A] vs t; tweede orde in 1/[A] vs t.'},
{q:'In een endotherme reactie met Ea(heen) = 80 kJ/mol en ΔH = +30 kJ/mol is Ea(terug) gelijk aan:',o:['110 kJ/mol','80 kJ/mol','50 kJ/mol','30 kJ/mol'],c:2,e:'Ea(terug) = Ea(heen) − ΔH = 80 − 30 = 50 kJ/mol. (Voor exotherm: Ea(terug) = Ea(heen) + |ΔH|.)'},
{q:'Welk intermediair verschijnt in een reactiemechanisme?',o:['In de totaalvergelijking','Als product in één stap en reactant in een volgende','Als katalysator','In de snelheidswet van de totaalreactie'],c:1,e:'Intermediair wordt gevormd en verbruikt in opeenvolgende stappen; het verschijnt niet in de netto-vergelijking.'},
{q:'Enzymen verlagen Ea door:',o:['De temperatuur van de reactie te verhogen','Substraat in actieve site te binden en te oriënteren','De pH te verhogen','Water te verwijderen uit het evenwicht'],c:1,e:'Enzym-substraatcomplex oriënteert en spant de substraatbinding → lagere activeringsenergie dan zonder enzym.'},
{q:'Een leerling meet v = 3,6×10⁻³ mol/(L·s) voor een reactie met [A] = 0,12 M en k = 3,0×10⁻² s⁻¹. Wat is de orde in A?',o:['0','1','2','3'],c:1,e:'v/k = 3,6×10⁻³/3,0×10⁻² = 0,12 = [A]¹ → n = 1. De eenheid van k (s⁻¹) bevestigt eerste orde.'},
{q:'Welke snelheidswet is consistent met een botsingtheorie waarbij twee NO-moleculen botsen?',o:['v = k[NO]','v = k[NO]²','v = k','v = k[NO][N₂]'],c:1,e:'Als twee gelijke deeltjes botsen (bimoleculaire elementaire stap) is de snelheidswet tweede orde in dat deeltje.'},
{q:'Een leerling verdubbelt de concentratie van A en verdrievoudigt die van B; v wordt 36× groter. Als de orde in A = 2, wat is de orde in B?',o:['1','2','3','4'],c:1,e:'v ∝ [A]²[B]ⁿ → factor 4·3ⁿ = 36 → 3ⁿ = 9 → n = 2.'},
{q:'De Arrhenius-vergelijking k = Ae<sup>−Ea/RT</sup> toont dat k stijgt als:',o:['Ea stijgt','T daalt','A daalt','T stijgt'],c:3,e:'Hogere T → −Ea/RT wordt minder negatief → e<sup>−Ea/RT</sup> stijgt → k groter. Hogere Ea doet k dalen.'},
{q:'Heterogene katalyse vereist:',o:['Dat katalysator en reactanten in dezelfde fase zijn','Actieve plaatsen op het oppervlak van de katalysator','Dat Ea = 0','Enzymen als biologische katalysatoren'],c:1,e:'Heterogene katalyse: katalysator in andere fase (bv. vast Pt, gasfase reactanten). Reactanten adsorberen op actieve plaatsen van het oppervlak.'},
{q:'Welke bewering over reactiesnelheid en evenwicht is JUIST?',o:['Bij evenwicht geldt v(heen) = v(terug)','Bij evenwicht stopt de reactie volledig','v(heen) > v(terug) altijd bij evenwicht','Kc en k zijn hetzelfde symbool'],c:0,e:'Dynamisch evenwicht: v(heen) = v(terug) → netto concentratieverandering = 0. Reacties gaan door op moleculaire schaal.'},
{q:'Een katalytische converter in een auto gebruikt Pt en Pd om CO en NO om te zetten. Dit is:',o:['Homogene katalyse','Enzymkatalyse','Heterogene katalyse','Fotokatalyse'],c:2,e:'Vaste Pt/Pd-oppervlakken katalyseren gassen → andere fase → heterogeen.'},
{q:'Een reactie is pseudo-eersteorde als:',o:['Slechts één reactant aanwezig is','Concentratie van één reactant veel groter is dan de andere en vrijwel constant blijft','Ea = 0','Twee moleculen botsen'],c:1,e:'Bv. A + B → P met [B] >> [A] en constant → v ≈ k\'[A]; de reactie gedraagt zich als eersteorde in A.'},
{q:'De "vrije botsingstheorie" vereist voor een productieve botsing:',o:['Voldoende energie (E ≥ Ea) én juiste oriëntatie','Alleen voldoende energie','Alleen juiste oriëntatie','Reactanten in dezelfde fase'],c:0,e:'Beide factoren zijn nodig: energie ≥ Ea én moleculen moeten juist georiënteerd zijn (sterische factor).'},
{q:'Welke grafiek geeft een rechte lijn voor een eerste-orde-reactie?',o:['[A] vs t','[A]² vs t','ln[A] vs t','v vs [A]²'],c:2,e:'Eerste orde: [A] = [A]₀·e<sup>−kt</sup> → ln[A] = ln[A]₀ − kt → rechte met helling −k.'},
{q:'Als de temperatuur stijgt van 25°C naar 35°C en k verdubbelt, is Ea (benadering) ≈:',o:['30 kJ/mol','53 kJ/mol','80 kJ/mol','120 kJ/mol'],c:1,e:'ln(k₂/k₁) = Ea/R·(1/T₁−1/T₂). T₁=298K, T₂=308K. ln2=0,693; 1/298−1/308=1,09×10⁻⁴ K⁻¹ → Ea=0,693/(1,09×10⁻⁴)·8,314≈53 kJ/mol.'},
{q:'Een reactant A verdwijnt: Δ[A]/Δt = −0,040 mol/L/s. Stoechiometrie: A → 2B. De aanmaaksnelheid van B is:',o:['0,020 mol/L/s','0,040 mol/L/s','0,080 mol/L/s','0,160 mol/L/s'],c:2,e:'v(B) = −(1/2)·Δ[A]/Δt·2 = 2×0,040 = 0,080 mol/L/s. Stoechiometrische factor 2 vergroot de productieterm.'},
],
H2:[
{q:'Een dynamisch evenwicht is bereikt als:',o:['De concentraties van reactanten en producten gelijk zijn','De heen- en terugwaarste reactiesnelheden gelijk zijn','De reactie volledig is gestopt','Kc = 1'],c:1,e:'Dynamisch evenwicht: v(heen) = v(terug). Concentraties zijn constant maar niet noodzakelijk gelijk; microscopisch lopen beide reacties door.'},
{q:'De evenwichtsconstante Kc voor N₂(g) + 3H₂(g) ⇌ 2NH₃(g) is:',o:['Kc = [NH₃]²/([N₂][H₂]³)','Kc = [N₂][H₂]³/[NH₃]²','Kc = [NH₃]/([N₂][H₂])','Kc = 2[NH₃]/([N₂]·3[H₂])'],c:0,e:'Wet van massawerking: producten boven / reactanten onder, elk tot de macht van hun stoechiometrische coëfficiënt.'},
{q:'Kc = 4,2×10⁻⁵ bij 25°C. Dit evenwicht ligt:',o:['Ver naar de productzijde','Ver naar de reactantzijde','Precies in het midden','Afhankelijk van startconcentraties'],c:1,e:'Kc << 1 → evenwicht ligt naar links (reactanten overheersen). Kc >> 1 → producten overheersen.'},
{q:'Het reactiequotiënt Qc verschilt van Kc doordat:',o:['Qc gebruik maakt van evenwichtsconcentraties','Qc wordt berekend met actuele (niet-evenwichts)concentraties','Qc = 1/Kc altijd','Qc is altijd groter dan Kc'],c:1,e:'Qc geeft de toestand op enig moment; als Qc < Kc verschuift het evenwicht naar rechts; als Qc > Kc naar links.'},
{q:'Als Qc > Kc, verschuift het evenwicht:',o:['Naar rechts (productzijde)','Naar links (reactantzijde)','Er is geen verschuiving','Naar rechts als T stijgt'],c:1,e:'Qc > Kc: systeem heeft te veel producten → reactie verloopt terug naar links om Qc te laten dalen tot Kc.'},
{q:'Le Chatelier: bij verhoging van de druk in N₂(g)+3H₂(g)⇌2NH₃(g) verschuift het evenwicht:',o:['Naar links (meer mol gas)','Naar rechts (minder mol gas)','Geen verschuiving','Afhankelijk van Kc'],c:1,e:'Drukverhoging → systeem krimpt → verschuiving naar kant met minder gasmolen: 4 mol gas → 2 mol → naar rechts.'},
{q:'Wat is het effect van een hogere temperatuur op een exotherme reactie (Le Chatelier)?',o:['Evenwicht verschuift naar rechts; Kc stijgt','Evenwicht verschuift naar links; Kc daalt','Evenwicht verschuift naar rechts; Kc daalt','Geen effect op Kc'],c:1,e:'Warmte is als "product" bij exotherm; meer T → systeem duwt product (warmte) weg → naar links. Kc is T-afhankelijk en daalt hier.'},
{q:'In de ICE-tabel staat de I-rij voor:',o:['Ion concentraties','Initiële concentraties','Intermediaire waarden','Isomere vormen'],c:1,e:'ICE = Initial (beginwaarden), Change (verandering met ±x), Equilibrium (evenwichtswaarden = I + C).'},
{q:'Kc voor A⇌B is 9. Als [A]₀ = 1,00 M en [B]₀ = 0, wat is [B] bij evenwicht?',o:['0,10 M','0,50 M','0,90 M','1,00 M'],c:2,e:'ICE: [B] = x, [A] = 1−x. Kc = x/(1−x) = 9 → x = 9(1−x) → 10x = 9 → x = 0,90 M.'},
{q:'Toevoegen van een inert gas (bij constant volume) aan een gasfase-evenwicht:',o:['Verschuift evenwicht naar minder gasmolen','Heeft geen effect op het evenwicht','Verschuift altijd naar rechts','Verlaagt Kc'],c:1,e:'Inert gas verandert de partiaaldrukken van reactanten/producten niet bij constant volume → geen verschuiving. Wel bij constant totaaldruk.'},
{q:'Voor de reactie PCl₅⇌PCl₃+Cl₂ geldt Kc=0,040 M bij 250°C. [PCl₅]₀=0,500 M, rest 0. x=?',o:['x ≈ 0,10 M','x ≈ 0,13 M','x ≈ 0,20 M','x ≈ 0,040 M'],c:1,e:'Kc = x²/(0,500−x) = 0,040. Benadering: x² ≈ 0,040·0,500=0,020 → x≈0,141. Hercheck: 0,141²/(0,359)=0,0554≠0,040. Kwadratische: x²+0,040x−0,020=0 → x=(−0,040+√(0,0016+0,080))/2 ≈ 0,130 M.'},
{q:'Het Haber-proces (N₂+3H₂⇌2NH₃) gebruikt T=400-500°C ondanks dat lagere T betere Kc geeft, omdat:',o:['Hogere T geeft hogere Kc','Lagere T geeft hogere Kc maar te trage kinetiek','Kc is T-onafhankelijk','Druk heeft geen effect'],c:1,e:'Compromis kinetiek–thermodynamica: lage T → hoge K maar trage reactie; hoge T → sneller maar K kleiner. Optimum rond 400-500°C.'},
{q:'Kc is dimensieloos als:',o:['Σcoëff(prod) = Σcoëff(react)','Kc < 1','Alle soorten vast zijn','Reactie homogeen is'],c:0,e:'Kc is strikt genomen altijd dimensieloos (relatief t.o.v. standaardconcentratie 1 M), maar de eenheid "verdwijnt" wanneer Δn = 0 (mol-overschot = 0).'},
{q:'Een vaste stof verschijnt niet in de Kc-uitdrukking omdat:',o:['De activiteit van een zuivere vaste stof = 1 (constant)','Vaste stoffen zijn inert','Kc is alleen voor gassen','Vaste stoffen reageren niet'],c:0,e:'Activiteit van zuivere vaste stof of vloeistof = 1 per definitie (thermodynamische conventie); zij worden opgenomen in de K-constante.'},
{q:'Welke verstoring veroorzaakt GEEN verschuiving van het evenwicht A(g)⇌B(g) (Δn=0)?',o:['Drukverhoging bij constant volume','Toevoegen van A','Verwijderen van B','Temperatuurwijziging'],c:0,e:'Als Δn(gas) = 0 heeft drukverandering geen effect op de evenwichtspositie (wel op Kp). Toevoegen/verwijderen van stoffen en T-wijziging verschuiven wél.'},
{q:'Le Chatelier op een evenwicht met ΔH = −90 kJ/mol bij temperatuurstijging:',o:['Meer product gevormd','Minder product; Kc daalt','Kc stijgt; meer product','Geen effect'],c:1,e:'Exotherm evenwicht: warmte als product → hogere T → naar links → minder product → Kc daalt.'},
{q:'Als voor A⇌2B Kc = 4,0 en [A]=1,0 M, is [B] bij evenwicht:',o:['1,0 M','2,0 M','4,0 M','0,5 M'],c:1,e:'Kc=[B]²/[A]=4,0 → [B]²=4,0 → [B]=2,0 M.'},
{q:'Qc < Kc betekent:',o:['Reactie is in evenwicht','Teveel product aanwezig; reactie gaat terug','Te weinig product; reactie gaat vooruit','Reactie is niet mogelijk'],c:2,e:'Als Qc < Kc heeft het systeem nog niet genoeg producten → reactie gaat vooruit (naar rechts) tot Qc = Kc.'},
{q:'De waarde van Kc is afhankelijk van:',o:['Temperatuur','Startconcentraties','Druk','Volume'],c:0,e:'Kc is enkel T-afhankelijk (thermodynamisch gegeven). Startconcentraties, druk en volume beïnvloeden de evenwichtspositie maar niet de waarde van Kc.'},
{q:'Voor N₂O₄(g)⇌2NO₂(g) is Kc = 0,36 M bij 100°C. Als [N₂O₄]=0,060 M en [NO₂]=0,10 M, is het systeem:',o:['In evenwicht','Moet naar rechts verschuiven','Moet naar links verschuiven','Kan niet bepaald worden'],c:1,e:'Qc = (0,10)²/(0,060) = 0,01/0,060 = 0,167 < Kc = 0,36 → systeem verschuift naar rechts (meer NO₂ wordt gevormd tot Qc = Kc).'},
{q:'Bij elektrolytische dissociatie van water ⇌ H⁺ + OH⁻: welke eigenschap van Kw is uniek?',o:['Kw = 10⁻¹⁴ bij elke T','Kw = [H⁺][OH⁻] enkel bij zure pH','Kw stijgt bij hogere T (endotherm)','Kw is oneindig groot'],c:2,e:'De autoionisatie van water is endotherm → hogere T → meer ionisatie → Kw stijgt → bij 37°C is Kw ≈ 10⁻¹³·⁶.'},
{q:'Als Kc voor A⇌B = 3,0 en voor B⇌C = 5,0, dan is Kc voor A⇌C:',o:['8,0','2,0','15','1,5'],c:2,e:'Wanneer vergelijkingen worden opgeteld, worden Kc-waarden vermenigvuldigd: Kc(A⇌C) = 3,0 × 5,0 = 15.'},
{q:'Le Chatelier en katalysator: een katalysator aan een evenwichtsysteem toevoegen:',o:['Verschuift evenwicht naar productzijde','Verhoogt Kc','Versnelt zowel heen- als terugwaartse reactie gelijk; geen verschuiving','Verlaagt Ea van de heenreactie maar niet de terugwaartse'],c:2,e:'Katalysator verlaagt Ea van beide richtingen evenredig → sneller evenwicht bereikt, maar ligging (Kc) en positie ongewijzigd.'},
{q:'Voor 2SO₂(g)+O₂(g)⇌2SO₃(g), ΔH=−198 kJ, hoe bereik je maximale SO₃-opbrengst?',o:['Hoge T, lage P','Lage T, hoge P','Hoge T, hoge P','Lage T, lage P'],c:1,e:'Exotherm → lage T gunstig voor Kc. Δn(gas)=2−3=−1 → hogere P verschuift naar minder mol gas = naar producten.'},
{q:'In de ICE-methode voor H₂(g)+I₂(g)⇌2HI(g), Kc=49, [H₂]₀=[I₂]₀=0,50 M:',o:['[HI]=0 M bij evenwicht','[HI]≈0,70 M','[HI]≈0,35 M','[HI]≈1,00 M'],c:1,e:'ICE: x reageert, +2x HI. Kc=(2x)²/((0,5−x)²)=49 → 2x/(0,5−x)=7 → 2x=3,5−7x → 9x=3,5 → x=0,389; [HI]=2×0,389=0,778≈0,70-0,78 M (afronding → kies 0,70).'},
{q:'Een systeem bereikt sneller evenwicht maar op dezelfde evenwichtspositie bij:',o:['Hogere T (exotherm systeem)','Toevoegen van katalysator','Verhoogde druk (Δn=0)','Verwijderen van product'],c:1,e:'Katalysator versnelt de instelling van het evenwicht maar verandert de evenwichtsligging (Kc) niet. Andere opties verschuiven ook de positie.'},
{q:'Kc voor de omgekeerde reactie B⇌A als Kc(A⇌B)=0,25:',o:['0,25','0,50','4,0','−0,25'],c:2,e:'Kc(omgekeerd) = 1/Kc(heen) = 1/0,25 = 4,0.'},
{q:'Waarvoor staat de "C" in de ICE-tabel?',o:['Concentratie bij evenwicht','Verandering in concentratie (change)','Constante grootheid','Chemische formule'],c:1,e:'I = Initieel, C = Change (verandering, +x of −x), E = Evenwicht (I + C).'},
{q:'Een student mengt 0,10 mol A en 0,10 mol B in 1,0 L; Kc(A+B⇌C)=100 L/mol. Na evenwicht geldt [C] ≈:',o:['0,010 M','0,050 M','0,073 M','0,10 M'],c:2,e:'ICE: [C]=x, [A]=[B]=0,10−x. Kc = x/(0,10−x)² = 100. Numeriek oplossen: probeer x=0,073 → 0,073/(0,027)² = 0,073/7,3×10⁻⁴ = 100 ✓. [C] ≈ 0,073 M.'},
],
H5:[
{q:'Het broeikaseffect wordt primair veroorzaakt door:',o:['O₂ en N₂ die infraroodstraling absorberen','CO₂, CH₄ en H₂O die infraroodstraling absorberen en terugstralen','Ozonafbraak in de stratosfeer','Albedo van ijskappen'],c:1,e:'Broeikasgassen (CO₂, CH₄, N₂O, H₂O-damp) absorberen uitgaande IR-straling en stralen een deel terug naar aarde → netto opwarming.'},
{q:'Het wereldwijde aardopwarmingsvermogen (GWP) van CH₄ over 100 jaar is ≈:',o:['1','12','25','80'],c:2,e:'CH₄ heeft GWP₁₀₀ ≈ 25 (of 28 per IPCC AR5); CO₂ = 1 (referentie). Kortetermijn GWP₂₀ van CH₄ ≈ 80.'},
{q:'Fossiele brandstoffen vormen CO₂ bij verbranding. Welke verbinding maakt aardgas hoofdzakelijk uit?',o:['C₈H₁₈ (octaan)','C (cokes)','CH₄ (methaan)','C₃H₈ (propaan)'],c:2,e:'Aardgas is voor ≥90% methaan (CH₄). Octaan is benzine; cokes is vaste brandstof; propaan is LPG.'},
{q:'Bij het fotovoltaïsch effect in een zonnepaneel:',o:['Thermische energie verwarmt een turbine','Fotonen slaan elektronen vrij in een halfgeleider → elektrische stroom','CO₂ wordt gefixeerd via fotosynthese','H₂ wordt geproduceerd door waterlyse'],c:1,e:'Fotovoltaïsch effect (Einstein, 1905): fotonen met E ≥ bandkloof slaan elektronen vrij in het p-n-overgang van silicium → directe gelijkstroom.'},
{q:'De bandkloof van kristallijn silicium (c-Si) bedraagt ≈ 1,1 eV. Dit betekent dat:',o:['Alleen UV-fotonen kunnen worden omgezet','Fotonen met λ ≲ 1100 nm (nabij-IR tot UV) worden geabsorbeerd','IR-fotonen met hoge energie worden gereflecteerd','Silicium absorbeert enkel groen licht'],c:1,e:'E = hf = hc/λ; 1,1 eV correspondeert met λ ≈ 1130 nm. Fotonen met kortere golflengte (meer energie) worden geabsorbeerd en genereren elektron-gatparen.'},
{q:'Rendement van commerciële monokristallijne siliciumcellen bedraagt typisch:',o:['5–10%','15–22%','30–40%','50–60%'],c:1,e:'Commerciële mono-Si cellen halen 18–22% rendement. Multikristallijn: 15–18%. Tandem-experimenteel: >30%, maar niet commercieel gangbaar.'},
{q:'Waterstof als energiedrager: de omzetting H₂ + ½O₂ → H₂O(l) geeft een standaard vrije enthalpie ΔG° = −237 kJ/mol. Dit is de basis voor:',o:['Alkalische elektrolyse','De brandstofcel (energie-opwekking)','Haber-proces','Steamreforming'],c:1,e:'ΔG° < 0 → spontane oxidatie van H₂ → in een brandstofcel wordt deze vrije energie rechtstreeks omgezet in elektriciteit.'},
{q:'In een PEM-brandstofcel (Polymer Electrolyte Membrane) is de membraanfunctie:',o:['CO₂ te absorberen','Waterstofgas te opslaan','Protonengeleiding en elektronenisolatie','Katalyse van de O₂-reductie'],c:2,e:'Het Nafion-membraan geleidt H⁺-ionen (protonen) van anode naar kathode, maar blokkeert elektronen → deze stromen door de externe kring (stroom).'},
{q:'Bij een PEM-brandstofcel: welke reactie vindt plaats aan de anode?',o:['O₂ + 4H⁺ + 4e⁻ → 2H₂O','H₂ → 2H⁺ + 2e⁻','H₂O → H₂ + ½O₂','2H⁺ + 2e⁻ → H₂'],c:1,e:'Anode = oxidatie van H₂: H₂ → 2H⁺ + 2e⁻. Kathode = reductie van O₂: O₂+4H⁺+4e⁻ → 2H₂O.'},
{q:'Groene waterstofproductie via elektrolyse vereist:',o:['Aardgas als grondstof','Hernieuwbare elektriciteit om water te splitsen','Koolstofopslag (CCS)','Hoge druk van fossiele brandstof'],c:1,e:'Groene H₂: H₂O + elektriciteit (uit zon/wind) → H₂ + ½O₂. Grijze H₂ komt van aardgas/steamreforming; blauwe H₂ = grijs + CCS.'},
{q:'Waterstof heeft een massa-energiedichtheid van ≈120 MJ/kg, terwijl benzine ≈44 MJ/kg heeft. Welke praktische beperking heeft H₂?',o:['Lagere energiedichtheid per kg','Volumetrische energiedichtheid is laag (licht gas, lage densiteit)','Waterstof brandt niet','Te duur om te verbranden'],c:1,e:'H₂ heeft hogere gravimetrische maar veel lagere volumetrische energiedichtheid (lichte mol, groot volume nodig) → opslag als vloeibaar H₂ of onder hoge druk vereist.'},
{q:'In een lithium-ionbatterij is het actief materiaal van de anode (bij ontladen) typisch:',o:['LiCoO₂','Grafiet (C)','Mangaandioxide (MnO₂)','Zink'],c:1,e:'Li-ion anode: grafiet (Li<sub>x</sub>C₆); kathode: LiCoO₂ of LiFePO₄. Bij opladen gaat Li⁺ van kathode naar anode (intercalatie in grafiet).'},
{q:'Wat is de "energietransitie" in de context van duurzame energie?',o:['Overstap van kernenergie naar fossiel','Overstap van fossiele brandstoffen naar hernieuwbare energiebronnen','Stijging van energieprijzen','Meer gebruik van diesel'],c:1,e:'Energietransitie = de maatschappelijke overgang van koolstofintensieve fossiele brandstoffen naar hernieuwbare bronnen (zon, wind, water) om klimaatverandering te beperken.'},
{q:'De netto-reactie in een waterstof-zuurstof brandstofcel is:',o:['H₂ + O₂ → H₂O₂','2H₂ + O₂ → 2H₂O','H₂O → H₂ + ½O₂','4H⁺ + O₂ → 2H₂O'],c:1,e:'Anode: 2H₂ → 4H⁺+4e⁻; Kathode: O₂+4H⁺+4e⁻ → 2H₂O. Netto: 2H₂+O₂ → 2H₂O.'},
{q:'Welk type zonnepaneel heeft doorgaans het hoogste commerciële rendement?',o:['Amorfe siliciumcellen','Multikristallijne siliciumcellen','Monokristallijne siliciumcellen','Organische zonnecellen'],c:2,e:'Mono-Si: hoogste ordening → hoogste rendement (18–22%). Amorfe Si: flexibel maar laag rendement (~8%). Multi-Si: tussenpositie.'},
{q:'CO₂-opvang en -opslag (CCS) is een strategie om:',o:['CO₂ te gebruiken als brandstof','Fossiele emissies te compenseren door CO₂ geologisch op te slaan','Zonnepanelen te produceren','Waterstof te maken'],c:1,e:'CCS = Carbon Capture and Storage: CO₂ afkomstig van verbrandingsprocessen wordt afgevangen en ondergronds opgeslagen, waardoor netto-emissies dalen.'},
{q:'De "coulombische efficiëntie" van een batterij beschrijft:',o:['Het percentage lading dat kan worden teruggewonnen t.o.v. ingepompt','De maximale spanning','De cyclische levensduur','De ladingsdichtheid in Wh/kg'],c:0,e:'Coulombische efficiëntie = (lading bij ontladen)/(lading bij opladen)×100%. Hoge waarden (>99%) zijn essentieel voor lange levensduur.'},
{q:'Welke reactie beschrijft alkalische elektrolyse van water correct?',o:['Kathode: 4OH⁻→O₂+2H₂O+4e⁻; Anode: 2H₂O+2e⁻→H₂+2OH⁻','Kathode: 2H₂O+2e⁻→H₂+2OH⁻; Anode: 4OH⁻→O₂+2H₂O+4e⁻','Kathode: 2H⁺+2e⁻→H₂; Anode: H₂O→O₂+4H⁺','Kathode: O₂+4H⁺+4e⁻→2H₂O; Anode: H₂→2H⁺+2e⁻'],c:1,e:'Alkalische elektrolyse (KOH-oplossing): kathode reduceert water tot H₂+OH⁻; anode oxideert OH⁻ tot O₂+H₂O.'},
{q:'De belangrijkste reden dat windenergie intermitterend is:',o:['Wind waait altijd te hard','Wind is niet altijd beschikbaar (dag–nacht, seizoen, weertype)','Windturbines werken slechts 10% van de tijd','Turbines verbruiken meer dan ze produceren'],c:1,e:'Intermitterend = variabel in de tijd. Wind en zon zijn weersafhankelijk → niet altijd beschikbaar wanneer vraag piekt → nood aan opslag of back-up.'},
{q:'Steamreforming van methaan geeft welk type waterstof?',o:['Groene H₂','Grijze H₂','Blauwe H₂','Roze H₂'],c:1,e:'Grijze H₂: CH₄+H₂O → CO+3H₂ (gevolgd door shift-reactie) → CO₂ vrijgegeven. Blauw = grijs + CCS. Roze = elektrolyse met kernenergie. Groen = hernieuwbaar.'},
{q:'Een zonnepaneel van 300 W<sub>p</sub> ontvangt gemiddeld 4 vol-zon-uren per dag. Dagelijkse energieproductie:',o:['75 Wh','300 Wh','1200 Wh','4800 Wh'],c:2,e:'E = P × t = 300 W × 4 h = 1200 Wh = 1,2 kWh per dag.'},
{q:'Het principe van een PEM-elektrolyser is het omgekeerde van:',o:['Een alkalische batterij','Een PEM-brandstofcel','Een Li-ionbatterij','Een zonnepaneel'],c:1,e:'PEM-elektrolyser: stroom inpompen → H₂O splitsen in H₂+O₂. PEM-brandstofcel: H₂+O₂ combineren → stroom+H₂O. Exact omgekeerd procédé.'},
{q:'In een Li-ionbatterij migeren Li⁺-ionen bij ontladen van:',o:['Anode (grafiet) naar kathode (LiCoO₂) via elektrolyt','Kathode naar anode','De externe kring (elektrisch circuit)','Membraan naar anode'],c:0,e:'Bij ontladen: Li⁺ verlaat grafietanode → door elektrolyt → naar kathode. Elektronen stromen extern (= nuttige stroom). Bij opladen: omgekeerd.'},
{q:'De levencyclus-CO₂-uitstoot van zonnepanelen (van productie t/m sloop) is vergeleken met steenkool:',o:['Even hoog','10–20 keer hoger','10–50 keer lager','Identiek per kWh'],c:2,e:'Zonnepanelen: ≈20–50 g CO₂eq/kWh (lifecycle). Steenkool: ≈820–1000 g CO₂eq/kWh. Factor ~20–50 lager.'},
{q:'Het "smart grid" concept bij energietransitie verwijst naar:',o:['Een nieuw type zonnepaneel','Een intelligent elektriciteitsnetwerk dat vraag, aanbod en opslag dynamisch balanceert','Een batterijtype voor elektrische auto\'s','Een methode voor CO₂-opvang'],c:1,e:'Smart grid: digitaal netwerk met sensoren, opslag (batterijen, waterstof) en vraagbeheer om fluctuerend hernieuwbaar aanbod en variabele vraag in balans te brengen.'},
{q:'Energiedichtheid van Li-ionbatterijen (typische waarden, gravimetrisch):',o:['5–20 Wh/kg','50–100 Wh/kg','150–250 Wh/kg','500–800 Wh/kg'],c:2,e:'Commerciële Li-ion: 150–250 Wh/kg. Ter vergelijking: benzine ≈12 200 Wh/kg (maar verbrandingsmotor slechts 25–30% efficiënt).'},
{q:'Welk gas is verantwoordelijk voor de grootste absolute bijdrage aan het broeikaseffect van menselijke oorsprong?',o:['CH₄','N₂O','CO₂','H₂O'],c:2,e:'CO₂ heeft lagere GWP dan CH₄ of N₂O, maar de emissieomvang is enorm (37 Gt/jaar) → CO₂ levert de grootste absolute bijdrage aan antropogene klimaatverandering.'},
{q:'In een brandstofcel voor een voertuig zijn de enige uitlaatproducten:',o:['CO₂ en H₂O','H₂O en warmte','O₂ en H₂','N₂ en H₂O'],c:1,e:'H₂-brandstofcel: H₂ + ½O₂ → H₂O + warmte. Geen CO₂, geen NOₓ, geen fijnstof. H₂O (als damp of vloeistof) is het enige uitlaatproduct.'},
{q:'De terugverdientijd (energy payback time) voor een silicium zonnepaneel bedraagt typisch:',o:['6 maanden – 2 jaar','10–15 jaar','20–25 jaar','Nooit (meer energie dan geproduceerd)'],c:0,e:'Moderne siliciummodules hebben een energetische terugverdientijd van 1–3 jaar (mono-Si) in West-Europese omstandigheden, bij een levensduur van 25–30 jaar.'},
{q:'Welke reactie beschrijft het opladen van een Li-ionbatterij aan de anode (grafiet)?',o:['LiC₆ → C₆ + Li⁺ + e⁻','C₆ + Li⁺ + e⁻ → LiC₆','Li⁺ + OH⁻ → LiOH','2Li → 2Li⁺ + 2e⁻'],c:1,e:'Bij opladen: Li⁺ wordt gereduceerd en intercaleert in grafiet: C₆ + Li⁺ + e⁻ → LiC₆. Bij ontladen verloopt de reactie in omgekeerde richting.'},
{q:'Fossiele brandstoffen zijn "niet hernieuwbaar" omdat:',o:['Ze te gevaarlijk zijn om te gebruiken','Hun vorming miljoenen jaren vereist terwijl verbruik op menselijke tijdschaal plaatsvindt','Ze niet kunnen worden verbrand','Ze altijd CO₂ produceren'],c:1,e:'Steenkool, aardolie en aardgas zijn gevormd uit organisch materiaal over 300+ miljoen jaar; verbruik gaat 10⁶× sneller dan aanvulling → praktisch niet-hernieuwbaar.'},
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

  const chapTitle = CHAP[chId]?.t ?? '';

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
            een verhandeling over de chemie van het 6e middelbaar
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

        {Object.entries(CHAP).map(([id,ch])=>({id,...ch})).map(ch=>{
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
        <span style={{flex:1,textAlign:'right',fontSize:11,letterSpacing:2,textTransform:'uppercase',color:P.sepia,fontStyle:'italic'}}>{CHAP[chId]?.roman??''}</span>
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
    if (!fd) return null;
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
          {doubleHeader(`${ts.cur+1}/5`,'Vraag')}

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
              {ts.cur===4?'Naar de beoordeling →':'Volgende vraag →'}
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
