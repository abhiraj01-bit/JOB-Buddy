"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { mockInterviews, mockInterviewQuestions } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StatusBadge } from "@/components/shared/status-badge"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ChevronRight,
  SkipForward,
  Square,
  Clock,
  Brain,
  MessageSquare,
  AlertTriangle,
  Camera,
  Shield,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function InterviewSessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const interview = mockInterviews.find((i) => i.id === id)
  const questions = interview?.questions || mockInterviewQuestions

  const [currentQ, setCurrentQ] = useState(0)
  const [answer, setAnswer] = useState("")
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [micOn, setMicOn] = useState(false)
  const [camOn, setCamOn] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const [showEndDialog, setShowEndDialog] = useState(false)
  const [confidence, setConfidence] = useState(72)
  const [warningCount, setWarningCount] = useState(0)

  const [transcript, setTranscript] = useState<{ role: string; text: string }[]>([
    { role: "ai", text: "Welcome to your mock interview. I'll be asking you a series of questions. Take your time and answer naturally." },
    { role: "ai", text: `Let's start with the first question. ${questions[0]?.text}` },
  ])

  useEffect(() => {
    const timer = setInterval(() => setElapsed((p) => p + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
  }

  const handleSubmitAnswer = () => {
    if (!answer.trim()) return
    const newAnswers = { ...answers, [currentQ]: answer }
    setAnswers(newAnswers)
    setTranscript((p) => [
      ...p,
      { role: "candidate", text: answer },
      { role: "ai", text: "Thank you for your response. Let me evaluate that..." },
    ])
    setConfidence(Math.min(100, Math.max(40, confidence + Math.floor(Math.random() * 20) - 5)))

    if (currentQ < questions.length - 1) {
      setTimeout(() => {
        setCurrentQ(currentQ + 1)
        setAnswer("")
        setTranscript((p) => [
          ...p,
          { role: "ai", text: `Next question: ${questions[currentQ + 1]?.text}` },
        ])
      }, 1000)
    }
  }

  const handleEndInterview = () => {
    router.push("/candidate/interviews")
  }

  if (!interview) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Interview not found.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      {/* Top Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-foreground">{interview.title}</h1>
          <StatusBadge label={`Q${currentQ + 1}/${questions.length}`} variant="info" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm font-mono text-foreground">
            <Clock className="h-4 w-4 text-muted-foreground" />
            {formatTime(elapsed)}
          </div>

          {/* Proctoring Indicators */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1">
              <Camera className="h-3 w-3 text-success" />
              <span className="text-[10px] font-medium text-success">CAM</span>
            </div>
            <div className={`flex items-center gap-1 rounded-full px-2 py-1 ${micOn ? "bg-success/10" : "bg-muted"}`}>
              {micOn ? <Mic className="h-3 w-3 text-success" /> : <MicOff className="h-3 w-3 text-muted-foreground" />}
              <span className={`text-[10px] font-medium ${micOn ? "text-success" : "text-muted-foreground"}`}>MIC</span>
            </div>
            {warningCount > 0 && (
              <div className="flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-1">
                <AlertTriangle className="h-3 w-3 text-destructive" />
                <span className="text-[10px] font-medium text-destructive">{warningCount}</span>
              </div>
            )}
          </div>

          <Button variant="destructive" size="sm" className="text-xs gap-1" onClick={() => setShowEndDialog(true)}>
            <Square className="h-3 w-3" /> End
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* AI Interviewer Panel */}
        <div className="space-y-4">
          {/* Question Card */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Brain className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">AI Interviewer</p>
                <p className="text-xs font-medium text-foreground">Question {currentQ + 1} of {questions.length}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-foreground leading-relaxed">{questions[currentQ]?.text}</p>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <StatusBadge label={questions[currentQ]?.category || "General"} variant="info" />
              <StatusBadge
                label={questions[currentQ]?.difficulty || "medium"}
                variant={questions[currentQ]?.difficulty === "hard" ? "destructive" : questions[currentQ]?.difficulty === "easy" ? "success" : "warning"}
              />
              {questions[currentQ]?.timeLimit && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {questions[currentQ].timeLimit}s suggested
                </span>
              )}
            </div>
          </div>

          {/* Confidence & Difficulty */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground mb-1">Confidence Level</p>
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-foreground">{confidence}%</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${confidence}%` }} />
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground mb-1">Difficulty</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold capitalize text-foreground">{questions[currentQ]?.difficulty || "Medium"}</span>
              </div>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3].map((l) => (
                  <div
                    key={l}
                    className={`h-1.5 flex-1 rounded-full ${
                      l <= (questions[currentQ]?.difficulty === "easy" ? 1 : questions[currentQ]?.difficulty === "hard" ? 3 : 2)
                        ? "bg-primary"
                        : "bg-secondary"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Transcript */}
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-4 py-2.5">
              <h3 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" />
                Live Transcript
              </h3>
            </div>
            <div className="max-h-52 overflow-y-auto p-4 space-y-3">
              {transcript.map((t, i) => (
                <div key={i} className={`flex gap-2 ${t.role === "candidate" ? "justify-end" : ""}`}>
                  <div className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                    t.role === "ai" ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
                  }`}>
                    {t.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Candidate Response Panel */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Your Response</h3>
            <Textarea
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-[200px] resize-none text-sm"
            />

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant={micOn ? "default" : "outline"}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setMicOn(!micOn)}
                  aria-label={micOn ? "Turn off microphone" : "Turn on microphone"}
                >
                  {micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
                <Button
                  variant={camOn ? "default" : "outline"}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setCamOn(!camOn)}
                  aria-label={camOn ? "Turn off camera" : "Turn on camera"}
                >
                  {camOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>
                {micOn && (
                  <span className="text-xs text-success flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    Recording...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {currentQ < questions.length - 1 ? (
                  <>
                    <Button variant="outline" size="sm" className="text-xs gap-1" onClick={() => {
                      setCurrentQ(currentQ + 1)
                      setAnswer("")
                    }}>
                      <SkipForward className="h-3 w-3" /> Skip
                    </Button>
                    <Button size="sm" className="text-xs gap-1" onClick={handleSubmitAnswer} disabled={!answer.trim()}>
                      Submit & Next <ChevronRight className="h-3 w-3" />
                    </Button>
                  </>
                ) : (
                  <Button size="sm" className="text-xs" onClick={() => setShowEndDialog(true)}>
                    Finish Interview
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Question Navigator */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h4 className="text-xs font-semibold text-foreground mb-3">Question Progress</h4>
            <div className="flex flex-wrap gap-2">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentQ(i); setAnswer(answers[i] || "") }}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                    i === currentQ
                      ? "bg-primary text-primary-foreground"
                      : answers[i]
                        ? "bg-success/10 text-success border border-success/20"
                        : "bg-secondary text-muted-foreground hover:bg-accent/10"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Proctoring Privacy Note */}
          <div className="rounded-xl border border-border bg-secondary/50 p-4">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-foreground">Proctoring Active</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                  Your camera and microphone are being monitored for assessment integrity. All data is encrypted and handled per our privacy policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End Interview Dialog */}
      <Dialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End Interview?</DialogTitle>
            <DialogDescription>
              You have answered {Object.keys(answers).length} of {questions.length} questions. Are you sure you want to end this interview?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEndDialog(false)}>Continue</Button>
            <Button variant="destructive" onClick={handleEndInterview}>End Interview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
