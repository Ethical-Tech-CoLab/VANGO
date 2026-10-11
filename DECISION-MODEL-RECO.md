# Decision-model recommendation: retain exact stamp lookup

Date: 2026-10-11. Public-source assessment; no integration proposed.
Reviewed [README](https://github.com/Ethical-Tech-CoLab/VANGO/blob/de5b8a3d4a6b2cb59a308fc4b6363b60443646c6/README.md).
This is a README-led review, not an audit of browser storage.

## No-fit decision for the current workflow

VANGO is an art-experience stamp passport, not an artwork authenticity or
ownership registry. Codes identify catalogue experiences and stamps persist
locally. Case/hyphen normalization and exact catalogue lookup are cheaper,
clearer and more reliable than Jev, Microsoft-Decision-1 or Sage.

Do not award stamps from semantic similarity, infer attendance from a model,
send profile photos to a decision endpoint, or turn this into person-level
identity resolution.

## Conditional future use

If a much larger catalogue later adds natural-language discovery, compare
lexical search with a small licensed local reranker before considering hosted
decision models. Rank candidate experiences only; code validation remains exact.
Jev's [reranking recipe](https://docs.typesafe.ai/cookbooks/rerank_typesafe.md)
describes that pattern, not evidence that this small app needs it.

Test multilingual queries, similarly named works and no-result requests.
Measure retrieval recall, ranking quality, wrong-stamp suggestions, browser
latency and total query cost. No user profile data is necessary for the trial.

## Gate and impact

Default recommendation: keep the current application unchanged. A future
discovery layer must be opt-in, have no influence on stamp authority and retain
local storage/privacy behavior. The three proprietary checkpoints are not
local models; alternative local rankers need license/hardware validation.
There are no measured savings and no changes requested in sibling art projects.
