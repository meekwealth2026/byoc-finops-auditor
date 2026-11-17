# BYOC FinOps & Shadow AI Auditor

[![FinOps Supporter](https://img.shields.io/badge/FinOps_Foundation-Supporter-green.svg)](https://www.finops.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform: Cross-Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Linux%20%7C%20Windows-lightgrey.svg)]()

An air-gapped, local-first desktop utility built for engineering and DevOps teams to audit multi-cloud infrastructure waste and LLM token bloat **100% locally with zero cloud telemetry or SaaS data egress**.

---

## Why BYOC FinOps?
Traditional FinOps SaaS platforms require ingestion pipelines, external data warehousing, and long-lived IAM/API keys—triggering severe **InfoSec review bottlenecks and compliance approvals**. 

The BYOC Auditor runs entirely on your machine, leveraging read-only billing APIs, native OS Keychains for credential storage, and automated Infrastructure-as-Code generation.

---

## Key Features

* **Multi-Cloud Orphaned Resource Discovery (AWS, Azure, GCP)**
  * Scans for unattached EBS/Managed Disks, idle RDS/SQL instances, and stale storage snapshots.
* **Shadow AI & LLM Gateway Waste Analysis (OpenAI & Anthropic)**
  * Evaluates usage endpoints to catch uncached system prompts, expensive flagship model token spikes (GPT-4o / Claude Sonnet), and rate-limit throttling patterns.
* **Automated IaC Remediation**
  * Outputs ready-to-review `remediate.tf` Terraform cleanup scripts alongside an executive summary report.
* **Zero-Trace Security**
  * Read-only session keys are encrypted in your native OS Keychain during the scan and wiped completely upon completion.

---

## Quick Start

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/meekwealth2026/byoc-finops-auditor.git](https://github.com/meekwealth2026/byoc-finops-auditor.git)
   cd byoc-finops-auditor
