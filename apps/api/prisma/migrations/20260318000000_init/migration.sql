-- CreateTable
CREATE TABLE "SectionInstance" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "sectionKey" TEXT NOT NULL,
    "draftProps" JSONB NOT NULL,
    "publishedProps" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectionInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageLayout" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "draftSections" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageLayout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublishedPage" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "snapshot" JSONB NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PublishedPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SectionInstance_pageSlug_sectionKey_key" ON "SectionInstance"("pageSlug", "sectionKey");

-- CreateIndex
CREATE INDEX "SectionInstance_pageSlug_idx" ON "SectionInstance"("pageSlug");

-- CreateIndex
CREATE UNIQUE INDEX "PageLayout_pageSlug_key" ON "PageLayout"("pageSlug");

-- CreateIndex
CREATE UNIQUE INDEX "PublishedPage_pageSlug_key" ON "PublishedPage"("pageSlug");
