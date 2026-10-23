import { Check, MessageCircle, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { whatsappUrl, type Topic } from "@/lib/atendimento";

export function ServiceDialog({ topic, onClose }: { topic: Topic | null; onClose: () => void }) {
  return (
    <Dialog open={topic !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="care-dialog">
        {topic && <>
          <div className="dialog-symbol"><topic.icon size={30} strokeWidth={1.6} /></div>
          <DialogHeader>
            <span className="eyebrow">VAMOS TE ORIENTAR</span>
            <DialogTitle className="dialog-heading">{topic.title}</DialogTitle>
            <DialogDescription className="dialog-copy">{topic.detail}</DialogDescription>
          </DialogHeader>
          <a className="button button-green" href={whatsappUrl(topic.message)} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} />{topic.action}</a>
          <div className="dialog-safety"><ShieldCheck size={19} /><span>O WhatsApp abrirá com a mensagem pronta. Revise antes de enviar e nunca compartilhe senhas ou códigos de verificação.</span></div>
        </>}
      </DialogContent>
    </Dialog>
  );
}

export function TutorialDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const steps = [
    ["Escolha o assunto", "Selecione a opção que mais combina com o que você precisa."],
    ["Veja a orientação", "Confira as informações e escolha o canal de atendimento indicado."],
    ["Inicie a conversa", "Se escolher o WhatsApp, revise a mensagem e toque em enviar no aplicativo."],
  ];
  return <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
    <DialogContent className="care-dialog">
      <DialogHeader><span className="eyebrow">PASSO A PASSO</span><DialogTitle className="dialog-heading">Seu atendimento, sem complicação.</DialogTitle><DialogDescription className="dialog-copy">Em poucos passos, você encontra o caminho certo para falar com a equipe.</DialogDescription></DialogHeader>
      <div className="tutorial-steps">{steps.map(([title, copy], i) => <div className="tutorial-step" key={title}><span>{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div>
      <button className="button button-green" onClick={() => { onClose(); document.getElementById("atendimento")?.scrollIntoView({ behavior: "smooth" }); }}>Entendi, escolher meu assunto<Check size={18} /></button>
    </DialogContent>
  </Dialog>;
}
