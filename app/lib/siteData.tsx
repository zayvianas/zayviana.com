import {
  SiPython, SiJavascript, SiReact, SiHtml5, SiCss,
  SiDjango, SiMysql, SiSqlite, SiGit, SiVercel,
  SiDatabricks, SiSnowflake,
  SiJira, SiConfluence, SiMiro, SiFigma, SiNotion, SiSlack,
} from "react-icons/si"
import { FaJava } from "react-icons/fa"
import type { IconType } from "react-icons"

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons"

export type TechItem = { name: string; Icon: IconType | null; img: string | null; color: string }

export const techCategories: { label: string; items: TechItem[] }[] = [
  {
    label: "Languages",
    items: [
      { name: "Python",      Icon: SiPython,     img: null, color: "#3776AB" },
      { name: "SQL",         Icon: null,         img: null, color: "#336791" },
      { name: "JavaScript",  Icon: SiJavascript, img: null, color: "#F7DF1E" },
      { name: "Java",        Icon: FaJava,       img: null, color: "#ED8B00" },
    ],
  },
  {
    label: "Python & Data",
    items: [
      { name: "Pandas",     Icon: null, img: `${DI}/pandas/pandas-original.svg`,         color: "#150458" },
      { name: "NumPy",      Icon: null, img: `${DI}/numpy/numpy-original.svg`,           color: "#013243" },
      { name: "Matplotlib", Icon: null, img: `${DI}/matplotlib/matplotlib-original.svg`, color: "#11557C" },
      { name: "Jupyter",    Icon: null, img: `${DI}/jupyter/jupyter-original.svg`,       color: "#F37626" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React",  Icon: SiReact,  img: null, color: "#61DAFB" },
      { name: "HTML5",  Icon: SiHtml5,  img: null, color: "#E34F26" },
      { name: "CSS3",   Icon: SiCss,    img: null, color: "#1572B6" },
    ],
  },
  {
    label: "Backend & Databases",
    items: [
      { name: "Django",  Icon: SiDjango, img: null, color: "#44B78B" },
      { name: "MySQL",   Icon: SiMysql,  img: null, color: "#4479A1" },
      { name: "SQLite",  Icon: SiSqlite, img: null, color: "#003B57" },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "AWS",    Icon: null, img: `${DI}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, color: "#FF9900" },
      { name: "Azure",  Icon: null, img: `${DI}/azure/azure-original.svg`,                               color: "#0078D4" },
      { name: "Git",    Icon: SiGit,    img: null, color: "#F05032" },
      { name: "Vercel", Icon: SiVercel, img: null, color: "#888888" },
    ],
  },
  {
    label: "Data & Analytics",
    items: [
      { name: "Tableau",    Icon: null, img: null, color: "#E97627" },
      { name: "Power BI",   Icon: null, img: `${DI}/microsoftsqlserver/microsoftsqlserver-plain.svg`, color: "#F2C811" },
      { name: "Excel",      Icon: null, img: null, color: "#217346" },
      { name: "ServiceNow Analytics", Icon: null, img: null, color: "#62D84E" },
      { name: "Databricks", Icon: SiDatabricks, img: null, color: "#FF3621" },
      { name: "Snowflake",  Icon: SiSnowflake,  img: null, color: "#29B5E8" },
    ],
  },
  {
    label: "PM & Collaboration",
    items: [
      { name: "Jira",         Icon: SiJira,       img: null, color: "#0052CC" },
      { name: "Confluence",   Icon: SiConfluence, img: null, color: "#0052CC" },
      { name: "Azure DevOps", Icon: null, img: `${DI}/azuredevops/azuredevops-original.svg`, color: "#0078D7" },
      { name: "Miro",         Icon: SiMiro,       img: null, color: "#FFD02F" },
      { name: "Figma",        Icon: SiFigma,      img: null, color: "#F24E1E" },
      { name: "Notion",       Icon: SiNotion,     img: null, color: "#888888" },
      { name: "Slack",        Icon: SiSlack,      img: null, color: "#4A154B" },
    ],
  },
]

export const clients = [
  { name: "Feastables",               domain: "feastables.com" },
  { name: "Who's Your Landlord",      domain: "wyl.co" },
  { name: "SuperCarl",                domain: "supercarl.ai" },
  { name: "Tampa Electric",           domain: "tampaelectric.com" },
  { name: "Miter Brands",             domain: "miterbrands.com" },
  { name: "New South Windows",        domain: "newsouthwindow.com" },
  { name: "PGT Innovations",          domain: "pgtinnovations.com" },
  { name: "Upmeals / Demi",           domain: "getdemi.co" },
  { name: "Data For Inclusion",       domain: "dataforinclusion.com" },
  { name: "Atunwa Digital",           domain: "atunwadigital.com" },
  { name: "Positronix",               domain: "uspositronix.com" },
  { name: "Band Connect",             domain: "bandconnect.net" },
  { name: "Feeding South Florida",    domain: "feedingsouthflorida.org" },
  { name: "Klerk",                    domain: "klerk.ca" },
  { name: "Word Collections",         domain: "wordcollections.com" },
  { name: "Lima Compost",             domain: "limacompost.com" },
  { name: "Sumeera",                  domain: "sumeerasolutions.com" },
  { name: "HomeCare Hub",             domain: "homecarehub.com" },
  { name: "Ready Set Surgical",       domain: "readysetsurgical.com" },
]

export type Build = {
  name: string
  type: string
  status: "Live" | "Active" | "Available" | "Building"
  color: string
  desc: string
  href: string | null
  cta?: string
}

export const builds: Build[] = [
  {
    name: "The Good Tutor",
    type: "Service",
    status: "Available",
    color: "#10b981",
    desc: "A tutoring service for people who think differently, rooted in ADHD, dyslexia, and a love of learning.",
    href: "https://calendar.app.google/ifYoVPjNkCwU39Qm6",
    cta: "Book a session →",
  },
  {
    name: "Nest Egg",
    type: "Product",
    status: "Live",
    color: "#e11d48",
    desc: "A financial wellness product helping people, especially underrepresented communities, build sustainable habits and wealth. V1 is live.",
    href: "https://nestegg.cstonelabs.com/",
    cta: "Visit Nest Egg →",
  },
  {
    name: "Nearby",
    type: "App",
    status: "Building",
    color: "#f472b6",
    desc: "A location-aware app connecting people to what's around them: local events, businesses, and opportunities hiding in plain sight.",
    href: null,
  },
  {
    name: "Christians Anonymous",
    type: "App & Community",
    status: "Building",
    color: "#e11d48",
    desc: "An app and community for Christians who are honest about doubt, struggle, and growth. A place to belong, with no performance required.",
    href: null,
  },
]
