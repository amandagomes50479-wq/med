import { useState, type FormEvent } from "react";
import { ArrowUpRight, LockKeyhole, MessageCircle } from "lucide-react";
import { WHATSAPP_DISPLAY, topics, whatsappUrl } from "@/lib/atendimento";

export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const [messageUrl, setMessageUrl] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const subject = String(form.get("subject") ?? "");
    const message = String(form.get("message") ?? "").trim();
    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Informe seu nome com pelo menos 2 letras.";
    if (!topics.some(topic => topic.title === subject)) nextErrors.subject = "Selecione o assunto do atendimento.";
    if (message.length < 10) nextErrors.message = "Escreva uma mensagem com pelo menos 10 caracteres.";
    setErrors(nextErrors);
    setReady(false);
    if (Object.keys(nextErrors).length) return;
    const url = whatsappUrl(`Olá! Meu nome é ${name}.\nAssunto: ${subject}.\n\n${message}`);
    setMessageUrl(url);
    setReady(true);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return <form className="contact-form" onSubmit={handleSubmit} noValidate onChange={() => setReady(false)}>
    <div className="form-row">
      <div className="field"><label htmlFor="contact-name">Seu nome <span>*</span></label><input id="contact-name" name="name" placeholder="Como podemos chamar você?" maxLength={80} autoComplete="given-name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <small id="name-error" className="field-error">{errors.name}</small>}</div>
      <div className="field"><label htmlFor="contact-subject">Assunto <span>*</span></label><select id="contact-subject" name="subject" defaultValue="" required aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined}><option value="" disabled>Selecione um assunto</option>{topics.map(topic => <option key={topic.id} value={topic.title}>{topic.title}</option>)}</select>{errors.subject && <small id="subject-error" className="field-error">{errors.subject}</small>}</div>
    </div>
    <div className="field"><label htmlFor="contact-message">Como podemos ajudar? <span>*</span></label><textarea id="contact-message" name="message" rows={4} maxLength={1000} placeholder="Conte, em poucas palavras, o que você precisa. Não inclua senhas ou documentos." required aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : "form-privacy"} />{errors.message && <small id="message-error" className="field-error">{errors.message}</small>}</div>
    <p className="form-privacy" id="form-privacy"><LockKeyhole size={15} /> Seus dados não são armazenados aqui. Você revisa e envia a mensagem no WhatsApp {WHATSAPP_DISPLAY}.</p>
    <button className="button button-green" type="submit"><MessageCircle size={19} /> Continuar no WhatsApp <ArrowUpRight size={19} /></button>
    {ready && <p className="form-feedback" role="status">Sua mensagem está pronta, mas ainda não foi enviada. <a href={messageUrl} target="_blank" rel="noopener noreferrer">Abrir o WhatsApp para revisar e enviar.</a></p>}
  </form>;
}
