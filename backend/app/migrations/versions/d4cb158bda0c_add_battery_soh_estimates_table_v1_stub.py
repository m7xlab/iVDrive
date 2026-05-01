"""migration stub - repairs broken chain

Revision ID: d4cb158bda0c
Revises: 4c5c9e5b4a60
Create Date: 2026-04-30 15:00:00.000000
Create Date: 2026-04-30 15:00:00.000000

Stub migration to repair broken migration chain.
Production DB recorded d4cb158bda0c but no migration file existed,
causing alembic upgrade head to fail with KeyError: 'd4cb158bda0c'.

This stub allows the chain to continue to f36d25e55dd8.
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = 'd4cb158bda0c'
down_revision: Union[str, None] = '4c5c9e5b4a60'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
