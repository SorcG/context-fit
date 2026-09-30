import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import {
  LegalContent,
  LegalLink,
  type LegalBlock,
} from "@/components/legal/LegalBlocks";

export const metadata: Metadata = {
  title: "Datenschutz — Context Fit",
  description: "Datenschutzerklärung von Context Fit — Bram van Koppen, Paderborn.",
};

const blocks: LegalBlock[] = [
  { type: "h2", text: "1. Datenschutz auf einen Blick" },
  { type: "h3", text: "Allgemeine Hinweise" },
  {
    type: "p",
    content:
      "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.",
  },
  { type: "h3", text: "Datenerfassung auf dieser Website" },
  { type: "h4", text: "Wer ist verantwortlich für die Datenerfassung auf dieser Website?" },
  {
    type: "p",
    content:
      "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.",
  },
  { type: "h4", text: "Wie erfassen wir Ihre Daten?" },
  {
    type: "p",
    content:
      "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.",
  },
  {
    type: "p",
    content:
      "Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.",
  },
  { type: "h4", text: "Wofür nutzen wir Ihre Daten?" },
  {
    type: "p",
    content:
      "Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.",
  },
  { type: "h4", text: "Welche Rechte haben Sie bezüglich Ihrer Daten?" },
  {
    type: "p",
    content:
      "Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.",
  },
  {
    type: "p",
    content:
      "Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.",
  },
  { type: "h3", text: "Analyse-Tools und Tools von Drittanbietern" },
  {
    type: "p",
    content:
      "Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen.",
  },
  {
    type: "p",
    content:
      "Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.",
  },

  { type: "h2", text: "2. Hosting" },
  {
    type: "p",
    content: "Wir hosten die Inhalte unserer Website bei folgendem Anbieter:",
  },
  { type: "h3", text: "Externes Hosting" },
  {
    type: "p",
    content:
      "Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.",
  },
  {
    type: "p",
    content:
      "Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.",
  },
  {
    type: "p",
    content:
      "Unser(e) Hoster wird bzw. werden Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen.",
  },
  { type: "p", content: "Wir setzen folgende(n) Hoster ein:" },
  {
    type: "address",
    lines: ["Vercel Inc.", "340 S Lemon Ave #4133", "Walnut, CA 91723", "USA"],
  },
  { type: "h4", text: "Auftragsverarbeitung" },
  {
    type: "p",
    content:
      "Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.",
  },

  { type: "h2", text: "3. Allgemeine Hinweise und Pflichtinformationen" },
  { type: "h3", text: "Datenschutz" },
  {
    type: "p",
    content:
      "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.",
  },
  {
    type: "p",
    content:
      "Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.",
  },
  {
    type: "p",
    content:
      "Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.",
  },
  { type: "h3", text: "Hinweis zur verantwortlichen Stelle" },
  {
    type: "p",
    content: "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:",
  },
  {
    type: "address",
    lines: [
      "Bram van Koppen",
      "Pohlweg 76 / Wohnung 78",
      "33098 Paderborn",
      "Telefon: +4915117814726",
      "E-Mail: info@context-fit.com",
    ],
  },
  {
    type: "p",
    content:
      "Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.",
  },
  { type: "h3", text: "Speicherdauer" },
  {
    type: "p",
    content:
      "Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.",
  },
  {
    type: "h3",
    text: "Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website",
  },
  {
    type: "p",
    content:
      "Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind, auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.",
  },
  { type: "h3", text: "Empfänger von personenbezogenen Daten" },
  {
    type: "p",
    content:
      "Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung geschlossen.",
  },
  { type: "h3", text: "Widerruf Ihrer Einwilligung zur Datenverarbeitung" },
  {
    type: "p",
    content:
      "Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.",
  },
  {
    type: "h3",
    text: "Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)",
  },
  {
    type: "p",
    content:
      "WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).",
  },
  {
    type: "p",
    content:
      "WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).",
  },
  { type: "h3", text: "Beschwerderecht bei der zuständigen Aufsichtsbehörde" },
  {
    type: "p",
    content:
      "Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.",
  },
  { type: "h3", text: "Recht auf Datenübertragbarkeit" },
  {
    type: "p",
    content:
      "Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.",
  },
  { type: "h3", text: "Auskunft, Berichtigung und Löschung" },
  {
    type: "p",
    content:
      "Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.",
  },
  { type: "h3", text: "Recht auf Einschränkung der Verarbeitung" },
  {
    type: "p",
    content:
      "Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:",
  },
  {
    type: "ul",
    items: [
      "Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
      "Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.",
      "Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
      "Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
    ],
  },
  {
    type: "p",
    content:
      "Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.",
  },
  { type: "h3", text: "SSL- bzw. TLS-Verschlüsselung" },
  {
    type: "p",
    content:
      "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.",
  },
  {
    type: "p",
    content:
      "Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.",
  },

  { type: "h2", text: "4. Datenerfassung auf dieser Website" },
  { type: "h3", text: "Kontaktformular" },
  {
    type: "p",
    content:
      "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
  },
  {
    type: "p",
    content:
      "Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.",
  },
  {
    type: "p",
    content:
      "Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.",
  },
  { type: "h3", text: "Anfrage per E-Mail, Telefon oder Telefax" },
  {
    type: "p",
    content:
      "Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
  },
  {
    type: "p",
    content:
      "Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.",
  },
  {
    type: "p",
    content:
      "Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.",
  },

  { type: "h2", text: "5. Soziale Medien" },
  { type: "h3", text: "Instagram" },
  {
    type: "p",
    content:
      "Auf dieser Website sind Funktionen des Dienstes Instagram eingebunden. Diese Funktionen werden angeboten durch die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland.",
  },
  {
    type: "p",
    content:
      "Wenn das Social-Media-Element aktiv ist, wird eine direkte Verbindung zwischen Ihrem Endgerät und dem Instagram-Server hergestellt. Instagram erhält dadurch Informationen über den Besuch dieser Website durch Sie.",
  },
  {
    type: "p",
    content:
      "Wenn Sie in Ihrem Instagram-Account eingeloggt sind, können Sie durch Anklicken des Instagram-Buttons die Inhalte dieser Website mit Ihrem Instagram-Profil verlinken. Dadurch kann Instagram den Besuch dieser Website Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Instagram erhalten.",
  },
  {
    type: "p",
    content:
      "Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.",
  },
  {
    type: "p",
    content: (
      <>
        Soweit mit Hilfe des hier beschriebenen Tools personenbezogene Daten
        auf unserer Website erfasst und an Facebook bzw. Instagram
        weitergeleitet werden, sind wir und die Meta Platforms Ireland
        Limited, Merrion Road Dublin 4, Dublin, D04 X2K5, Irland gemeinsam für
        diese Datenverarbeitung verantwortlich (Art. 26 DSGVO). Die
        gemeinsame Verantwortlichkeit beschränkt sich dabei ausschließlich
        auf die Erfassung der Daten und deren Weitergabe an Facebook bzw.
        Instagram. Die nach der Weiterleitung erfolgende Verarbeitung durch
        Facebook bzw. Instagram ist nicht Teil der gemeinsamen Verantwortung.
        Die uns gemeinsam obliegenden Verpflichtungen wurden in einer
        Vereinbarung über gemeinsame Verarbeitung festgehalten. Den Wortlaut
        der Vereinbarung finden Sie unter:{" "}
        <LegalLink href="https://www.facebook.com/legal/controller_addendum">
          https://www.facebook.com/legal/controller_addendum
        </LegalLink>
        . Laut dieser Vereinbarung sind wir für die Erteilung der
        Datenschutzinformationen beim Einsatz des Facebook- bzw.
        Instagram-Tools und für die datenschutzrechtlich sichere
        Implementierung des Tools auf unserer Website verantwortlich. Für die
        Datensicherheit der Facebook bzw. Instagram-Produkte ist Facebook
        verantwortlich. Betroffenenrechte (z. B. Auskunftsersuchen)
        hinsichtlich der bei Facebook bzw. Instagram verarbeiteten Daten
        können Sie direkt bei Facebook geltend machen. Wenn Sie die
        Betroffenenrechte bei uns geltend machen, sind wir verpflichtet,
        diese an Facebook weiterzuleiten.
      </>
    ),
  },
  {
    type: "p",
    content: (
      <>
        Die Datenübertragung in die USA wird auf die Standardvertragsklauseln
        der EU-Kommission gestützt. Details finden Sie hier:{" "}
        <LegalLink href="https://www.facebook.com/legal/EU_data_transfer_addendum">
          https://www.facebook.com/legal/EU_data_transfer_addendum
        </LegalLink>
        ,{" "}
        <LegalLink href="https://privacycenter.instagram.com/policy/">
          https://privacycenter.instagram.com/policy/
        </LegalLink>{" "}
        und{" "}
        <LegalLink href="https://de-de.facebook.com/help/566994660333381">
          https://de-de.facebook.com/help/566994660333381
        </LegalLink>
        .
      </>
    ),
  },
  {
    type: "p",
    content: (
      <>
        Weitere Informationen hierzu finden Sie in der Datenschutzerklärung
        von Instagram:{" "}
        <LegalLink href="https://privacycenter.instagram.com/policy/">
          https://privacycenter.instagram.com/policy/
        </LegalLink>
        .
      </>
    ),
  },
  {
    type: "p",
    content: (
      <>
        Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data
        Privacy Framework“ (DPF). Der DPF ist ein Übereinkommen zwischen der
        Europäischen Union und den USA, der die Einhaltung europäischer
        Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten
        soll. Jedes nach dem DPF zertifizierte Unternehmen verpflichtet sich,
        diese Datenschutzstandards einzuhalten. Weitere Informationen hierzu
        erhalten Sie vom Anbieter unter folgendem Link:{" "}
        <LegalLink href="https://www.dataprivacyframework.gov/participant/4452">
          https://www.dataprivacyframework.gov/participant/4452
        </LegalLink>
        .
      </>
    ),
  },

  { type: "h2", text: "6. Plugins und Tools" },
  { type: "h3", text: "Google Fonts" },
  {
    type: "p",
    content:
      "Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.",
  },
  {
    type: "p",
    content:
      "Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern von Google aufnehmen. Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse diese Website aufgerufen wurde. Die Nutzung von Google Fonts erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der einheitlichen Darstellung des Schriftbildes auf seiner Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.",
  },
  {
    type: "p",
    content:
      "Wenn Ihr Browser Google Fonts nicht unterstützt, wird eine Standardschrift von Ihrem Computer genutzt.",
  },
  {
    type: "p",
    content: (
      <>
        Weitere Informationen zu Google Fonts finden Sie unter{" "}
        <LegalLink href="https://developers.google.com/fonts/faq">
          https://developers.google.com/fonts/faq
        </LegalLink>{" "}
        und in der Datenschutzerklärung von Google:{" "}
        <LegalLink href="https://policies.google.com/privacy?hl=de">
          https://policies.google.com/privacy?hl=de
        </LegalLink>
        .
      </>
    ),
  },
  {
    type: "p",
    content: (
      <>
        Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data
        Privacy Framework“ (DPF). Der DPF ist ein Übereinkommen zwischen der
        Europäischen Union und den USA, der die Einhaltung europäischer
        Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten
        soll. Jedes nach dem DPF zertifizierte Unternehmen verpflichtet sich,
        diese Datenschutzstandards einzuhalten. Weitere Informationen hierzu
        erhalten Sie vom Anbieter unter folgendem Link:{" "}
        <LegalLink href="https://www.dataprivacyframework.gov/participant/5780">
          https://www.dataprivacyframework.gov/participant/5780
        </LegalLink>
        .
      </>
    ),
  },
  {
    type: "p",
    content: (
      <>
        Quelle:{" "}
        <LegalLink href="https://www.e-recht24.de">
          https://www.e-recht24.de
        </LegalLink>
      </>
    ),
  },
];

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <section className="py-12 lg:py-24">
      <Container variant="narrow" className="flex flex-col gap-8">
        <Reveal className="flex flex-col gap-3">
          <p className="text-sm font-semibold tracking-wide text-accent lg:text-base">
            Rechtliches
          </p>
          <h1 className="text-3xl leading-[1.1] text-text lg:text-5xl">
            Datenschutzerklärung
          </h1>
        </Reveal>

        <Reveal delay={0.05}>
          <LegalContent blocks={blocks} />
        </Reveal>
      </Container>
    </section>
  );
}
