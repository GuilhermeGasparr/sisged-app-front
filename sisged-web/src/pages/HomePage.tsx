
import {
  GraduationCap,
  BookOpen,
  GitBranch,
  ArrowUpRight,
} from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <GitBranch size={24} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                SISGED
              </h1>
              <p className="text-xs text-slate-500">
                Gestão de Fluxos Acadêmicos
              </p>
            </div>
          </div>

          <span className="text-sm font-medium text-slate-500">
            Sistema acadêmico
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Gestão acadêmica inteligente
          </span>

          <h2 className="mt-8 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Organize sua jornada acadêmica com o SISGED.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Uma plataforma para gerenciar fluxos de disciplinas,
            acompanhar o progresso acadêmico e planejar sua matrícula
            de maneira mais simples e organizada.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <GraduationCap size={26} />
            </div>

            <h3 className="mt-6 text-xl font-bold">
              Área do Aluno
            </h3>

            <p className="mt-3 leading-relaxed text-slate-600">
              Acompanhe suas disciplinas, visualize seu fluxograma
              acadêmico e planeje sua trajetória até a conclusão do curso.
            </p>

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
              Em desenvolvimento
              <ArrowUpRight size={16} />
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <BookOpen size={26} />
            </div>

            <h3 className="mt-6 text-xl font-bold">
              Área do Coordenador
            </h3>

            <p className="mt-3 leading-relaxed text-slate-600">
              Gerencie fluxos curriculares, organize disciplinas
              ofertadas e acompanhe os períodos de matrícula.
            </p>

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
              Em desenvolvimento
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>

        <footer className="mt-16 border-t border-slate-200 pt-6 text-center text-sm text-slate-400">
          SISGED — Sistema de Gerenciamento de Fluxo de Disciplinas
        </footer>
      </section>
    </main>
  )
}
