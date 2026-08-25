# NeuroBrew

Сварим крафтуху вместе с нейроновыми.


## Идея

Удаленый репозиторий для правил, скилов для нейронок и агентов.
Разделение бекенд, фронтенд. Фронт на некстжс, там все конфигурируем. Бекенд NestJs + fastify адаптер - обслуживает мсп подключения. Скорее всего, нужно будет shared-библиотеку для базы данных. 





## Это описание стандарта Agent Scills

---
name: deploy-master
description: Используй этот скилл, когда пользователь просит выкатить код на прод.
compatibility: "requires: node >= 18, OS: linux/darwin, network: true"
license: MIT
metadata:
  category: devops
  mcp_dependencies: "postgres-mcp-server"
---

.agents/skills/my-complex-skill/
├── SKILL.md          # Главные инструкции + YAML (Обязательно)
├── scripts/          # Скрипты автоматизации (Python, Bash, JS)
├── references/       # Тяжелые доки, регламенты, ТЗ
└── assets/           # Шаблоны кода, иконки, конфиги
