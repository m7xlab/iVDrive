"""merge heads

Revision ID: a59b21a4819b
Revises: 3c8e7408b6f0, f1e8a9b4c7d9
Create Date: 2026-03-15 22:16:54.593246
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'a59b21a4819b'
down_revision: Union[str, None] = ('3c8e7408b6f0', 'f1e8a9b4c7d9')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
