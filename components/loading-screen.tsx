'use client'

import { useEffect, useState, useRef } from 'react'

type Stage = 'dom' | 'load' | 'fonts' | 'settle' | 'done'

export function LoadingScreen({ onFinish }: { onFinish?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [exit, setExit] = useState(false)
  const [mounted, setMounted] = useState(false)
  const stageRef = useRef<Stage>('dom')
  const settledRef = useRef(false)

  // Fade-in on mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  // Track real loading milestones
  useEffect(() => {
    // Stage 1: DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        stageRef.current = 'load'
        setProgress(30)
      })
    } else {
      stageRef.current = 'load'
      setProgress(30)
    }

    // Stage 2: Window load (images, stylesheets, etc.)
    if (document.readyState !== 'complete') {
      window.addEventListener('load', () => {
        stageRef.current = 'fonts'
        setProgress(70)
      })
    } else {
      stageRef.current = 'fonts'
      setProgress(70)
    }

    // Stage 3: Fonts loaded
    document.fonts.ready.then(() => {
      stageRef.current = 'settle'
      setProgress(90)
    })

    // Stage 4: Settle — give a moment for layout/paint
    const settleTimer = setTimeout(() => {
      if (!settledRef.current) {
        settledRef.current = true
        stageRef.current = 'done'
        setProgress(100)
      }
    }, 600)

    // Safety net: force complete after 5s
    const safetyTimer = setTimeout(() => {
      if (!settledRef.current) {
        settledRef.current = true
        stageRef.current = 'done'
        setProgress(100)
      }
    }, 5000)

    return () => {
      clearTimeout(settleTimer)
      clearTimeout(safetyTimer)
    }
  }, [])

  // Auto-exit after progress completes + fade-out delay
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setExit(true)
        onFinish?.()
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [progress, onFinish])

  if (exit) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-200 ${
        progress >= 100 ? 'opacity-0' : mounted ? 'opacity-100' : 'opacity-0'
      } motion-reduce:transition-none`}
      role="status"
      aria-label="Loading Nijushi"
    >
      <div className="absolute inset-0 bg-background" />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-7">
        {/* Logo */}
        <div className="h-16 w-16">
          <img
            src="/logo.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-contain [html[data-theme=dark]_&]:hidden"
          />
          <img
            src="/logo-dark.png"
            alt=""
            aria-hidden="true"
            className="hidden h-full w-full object-contain [html[data-theme=dark]_&]:block"
          />
        </div>

        {/* Brand name */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-lg font-semibold tracking-[0.12em] text-foreground">
            Nijushi
          </span>
          <span className="text-xs -mt-1 tracking-wide text-muted-foreground">
            Corp.
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-48 space-y-2">
          <div
            className="h-[3px] overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-label="Page loading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-200 ease-out motion-reduce:transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-xs tabular-nums text-muted-foreground">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  )
}