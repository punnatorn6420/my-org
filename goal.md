Product idea

Page Composer is a section-based page composition system.

It should allow:

Developers to create predefined section components

Admins to edit the content of those section components

Admins to arrange sections into a page layout for the Home page

The public site to render the Home page from the published layout

Important:
This is not a low-level page builder where users drag primitive UI parts like button/card/input.
Instead, developers will create ready-made section components, and the CMS will only manage:

section content

section placement in layout

Monorepo structure

Use Nx monorepo.

Create this structure conceptually:

apps/
web
cms
api

libs/
ui
sections
renderer
schema
utils
Tech stack

Use these technologies:

Nx monorepo

Next.js for web

Next.js for cms

NestJS for api

Tailwind CSS

shadcn/ui-inspired shared components via libs/ui

TypeScript everywhere

If there are Nx plugins required, include them properly.

Phase 1 scope

Keep this implementation strictly limited to Phase 1.

Public app (web)

Only one page for now:

/ = Home page

The public app should:

fetch published Home page data from API

render the page using shared renderer + shared section components

CMS app (cms)

Only build these main features for now:

1. Sections Editor

Admin should be able to:

list section instances

create a section instance from a predefined section type

edit section content/props

save section changes

2. Home Layout Editor

Admin should be able to:

load the Home page draft layout

add rows

choose row template

assign section instances into columns

reorder rows

save draft layout

publish Home page

Routes/pages to create:

/

/sections

/sections/[id]

/layouts/home

API app (api)

The backend should provide:

section instance CRUD (simple)

home layout draft save/load

publish Home page

public endpoint to get published Home page data

You may use in-memory storage or simple mock persistence in Phase 1, but structure the code cleanly so it can later be replaced by database persistence.

Important architecture rule

The CMS preview and the public site should use the same shared section components and the same shared renderer logic as much as possible.

That means:

apps/web should render using shared PageRenderer

apps/cms should also preview using shared PageRenderer

section components should live in libs/sections

shared UI primitives/wrappers should live in libs/ui

Do not duplicate the same section component separately for web and cms.

Core concepts to implement

1. SectionType

Use these initial section types:

hero

search_flight

promo_banner

category_grid

popular_services

Create a shared type for them.

Example idea:

export type SectionType =
| 'hero'
| 'search_flight'
| 'promo_banner'
| 'category_grid'
| 'popular_services'; 2. SectionDefinition

A SectionDefinition represents a developer-defined template for a section.

Each definition should include:

type

label

defaultProps

Create a shared structure for this.

Example idea:

export interface SectionDefinition {
type: SectionType;
label: string;
defaultProps: Record<string, any>;
} 3. SectionInstance

A SectionInstance is a real editable section created by admin.

Each instance should include:

id

type

name

props

status

Example:

export interface SectionInstance {
id: string;
type: SectionType;
name: string;
props: Record<string, any>;
status: 'draft' | 'published';
} 4. PageLayout

The Home page layout should include:

id

slug

rows

Example:

export interface PageLayout {
id: string;
slug: 'home';
rows: LayoutRow[];
} 5. LayoutRow

Each row should include:

id

template

columns

Supported templates in Phase 1:

12

6-6

4-4-4

Example:

export type RowTemplate = '12' | '6-6' | '4-4-4';

export interface LayoutRow {
id: string;
template: RowTemplate;
columns: LayoutColumn[];
} 6. LayoutColumn

Each column should include:

id

span

optional sectionInstanceId

Example:

export interface LayoutColumn {
id: string;
span: number;
sectionInstanceId?: string;
}
Shared libraries requirements
libs/ui

Create shared UI components/wrappers that can be used by both web and cms.

This does not need to be a full shadcn install at first, but it should be organized so it can evolve into shared design primitives.

Include reusable components such as:

Button

Card

Input

Textarea

Label

Select

SectionShell

They should be simple, clean, and Tailwind-based.

libs/sections

Create these shared section components:

HeroSection

SearchFlightSection

PromoBannerSection

CategoryGridSection

PopularServicesSection

Each one should:

live in shared libs

have typed props

be used by both web and cms

be visually clean and demo-ready

Example expectations

HeroSection: title, subtitle, image, CTA

SearchFlightSection: heading, simple search form UI

PromoBannerSection: image/banner text/button

CategoryGridSection: title + list of category cards

PopularServicesSection: title + list of service cards

Also create a shared registry mapping section type to actual component.

libs/schema

Create shared types/interfaces for:

SectionType

SectionDefinition

SectionInstance

PageLayout

LayoutRow

LayoutColumn

RowTemplate

Also export initial section definitions for the 5 section types with reasonable defaultProps.

libs/renderer

Create shared rendering logic:

PageRenderer

RowRenderer

SectionRenderer

PageRenderer should:

accept a PageLayout

accept a list/map of SectionInstance

render rows in order

render columns based on row template

resolve sectionInstanceId to actual section instance

render the correct shared section component

SectionRenderer should map section.type to the correct component from libs/sections.

Keep it clean and scalable.

libs/utils

Create helper functions if needed, such as:

id generator

className helper

small utility helpers

Apps requirements in detail
apps/web

Build a public Next.js app.

Requirements:

only one public page for now: /

fetch published Home page data from API

use shared PageRenderer

use Tailwind styling

keep app minimal and focused

Expected behavior:

after publish from CMS, the web home page should reflect the published layout and section content

apps/cms

Build a CMS Next.js app.

Routes/pages:

/

/sections

/sections/[id]

/layouts/home

/

A simple dashboard/entry page linking to:

Sections

Home Layout

/sections

A page that:

lists all section instances

lets admin create a new section instance from available section definitions

links to edit page for each section

/sections/[id]

A page that:

loads one section instance

shows a simple form to edit its props

updates and saves the section instance

The form can be simple and manual per section type for Phase 1.
It does not need a dynamic auto-generated form system yet.

/layouts/home

A page that:

loads current draft Home layout

lets admin add rows

lets admin choose row template

lets admin assign a section instance to each column via dropdown/select

lets admin reorder rows

lets admin save layout draft

lets admin publish

This does not need advanced drag-and-drop in Phase 1 if a clean reorder UI is easier.
Simple up/down controls are acceptable for the first version.

Also include a preview area that uses shared PageRenderer.

apps/api

Build a NestJS API app.

Create clean modules/controllers/services for:

sections

pages/home layout

publish/public page read

Expected endpoints
Section Instances

GET /admin/sections

POST /admin/sections

GET /admin/sections/:id

PUT /admin/sections/:id

Home Layout

GET /admin/pages/home/layout

PUT /admin/pages/home/layout

Publish

POST /admin/pages/home/publish

Public

GET /pages/home

Use in-memory storage for now, but organize code so it can later move to database persistence.

Also enable CORS for local web/cms development.

Data flow

Implement the following flow clearly:

CMS content flow

admin creates or edits section instances

section instances are saved in API

CMS layout flow

admin edits Home draft layout

layout references section instance IDs

draft layout is saved in API

admin clicks publish

published Home page snapshot is updated

Web flow

public web page fetches published Home page data

renders with shared PageRenderer

UI and UX expectations

Keep the UI:

clean

modern

minimal

readable

practical

Do not overengineer.
Do not add unnecessary dependencies.
Do not build advanced free-form editor behavior yet.

What NOT to build yet

Do not implement these in Phase 1:

floating sections

absolute positioned sections

free-form drag anywhere

nested multi-section stacks in one column

dynamic form engine

media manager

auth

permissions

version history

breakpoint-specific layout editor

low-level primitive UI page builder

What I want from you

Please do all of the following:

Scaffold the Nx workspace for this architecture

Create the apps and shared libs

Implement Phase 1 starter functionality

Keep code modular and realistic for future scaling

Show the final file/folder tree

Provide all important generated/modified file contents

List all install/setup commands

List all run commands

Explain how web, cms, and api connect together

Mention any assumptions you made

Final expected result

At the end of your implementation:

apps/web should render the published Home page

apps/cms should let admin:

manage section content

manage Home layout

preview layout

publish

apps/api should provide all required endpoints

shared libs should clearly separate:

UI primitives

section components

schema/types

page rendering logic

Please implement this in a clean, production-minded way, but keep the actual functionality limited to Phase 1.
